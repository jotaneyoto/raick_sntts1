export default async function handler(req, res) {
  // Configurações de Permissão (CORS)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  
  // Pega a chave da Vercel
  const SECRET_KEY = process.env.ABACASH_SECRET;
  if (!SECRET_KEY) return res.status(500).json({ error: "Chave não configurada" });

  try {
    const { action } = req.body;

  // === 1. CRIAR O PIX ===
if (action === 'create' || !action) {
    const { amount, buyerName } = req.body;
    
    const bodyCreate = {
        action: "create",
        method: "pix", // Adicione o método explicitamente
        product_id: "b8796vs1h", // O ID que o dono informou
        amount: parseFloat(amount), // Garante que é número decimal
        name: buyerName || "Cliente", // Algumas APIs usam 'name' direto no root
        customer: { 
            name: buyerName || "Cliente" 
        },
        description: "Compra de títulos - Roletas Premiadas" // Útil para o gateway identificar
    };

    const response = await fetch("https://app.abacash.com/api/payment.php", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${SECRET_KEY}` 
        },
        body: JSON.stringify(bodyCreate)
    });
    
    //

        const json = await response.json();
        const data = json.data || {};
        
        const code = data.qr_code || data.pix_code || json.qr_code;
        const img = data.qr_image_url || data.qrcode_image || json.qr_image_url;
        const pid = data.payment_id || json.payment_id || data.id;

        if (code) {
            return res.status(200).json({
                qr_code_text: code,
                qrCodeUrl: img,
                payment_id: pid 
            });
        }
        return res.status(400).json({ error: "Erro ao criar PIX", detail: json });
    }

    // === 2. VERIFICAR SE O PAGAMENTO CAIU E GERAR NÚMEROS ===
    if (action === 'check_status') {
        const { payment_id, qtde_numeros } = req.body;

        const response = await fetch("https://app.abacash.com/api/payment.php", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SECRET_KEY}` },
            body: JSON.stringify({ action: "check_status", payment_id: payment_id })
        });

        const json = await response.json();
        const status = json.data?.status || json.status;

        // Se estiver PAGO (approved ou paid), geramos os números
        if (status === 'approved' || status === 'paid') {
            const numeros = new Set();
            const total = parseInt(qtde_numeros) || 1;
            
            // Lógica para evitar loop infinito se pedir muitos números
            const maxTentativas = total * 3; 
            let tentativas = 0;

            while(numeros.size < total && tentativas < maxTentativas) {
                // Gera de 000000 a 999999
                const num = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
                numeros.add(num);
                tentativas++;
            }

            return res.status(200).json({
                status: 'approved',
                numeros: Array.from(numeros)
            });
        }

        // Se não, avisa que ainda tá pendente
        return res.status(200).json({ status: 'pending' });
    }

  } catch (error) {
    console.error("Erro Backend:", error);
    return res.status(500).json({ error: "Justino_k1ng", msg: error.message });
  }
}



