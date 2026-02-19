function validarCPF() {
    const cpfInput = document.getElementById('cpf');
    if (!cpfInput) return; 

    const cpf = cpfInput.value.replace(/\D/g, ''); 
    const messageSpan = document.querySelector('.message-cpf');
    const registerButton = document.querySelector('.btn-register');

    if (cpf.length !== 11) {
        messageSpan.innerHTML = '<p style="margin-top: 7px;"><i class="bi bi-exclamation-circle"></i>CPF inválido.</p>';
        registerButton.disabled = true; 
        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        messageSpan.innerHTML = '<p style="margin-top: 7px;"><i class="bi bi-exclamation-circle"></i> CPF inválido.</p>';
        registerButton.disabled = true; 
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        messageSpan.innerHTML = '<p style="margin-top: 7px;"><i class="bi bi-exclamation-circle"></i> CPF inválido.</p>';
        registerButton.disabled = true; 
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        messageSpan.innerHTML = '<p>CPF inválido.</p>';
        registerButton.disabled = true; 
        return false;
    }

    messageSpan.innerHTML = ''; 
    registerButton.disabled = false; 
    return true;
}

const cpfInput = document.getElementById('cpf');
if (cpfInput) {
    cpfInput.addEventListener('input', function() {
        if (this.value.length === 14) { 
            validarCPF();
        }
    });
}