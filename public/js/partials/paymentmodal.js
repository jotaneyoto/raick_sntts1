document.addEventListener('DOMContentLoaded', function() {
    const closeIcon = document.querySelector('.bi-x');
    const modalPayment = document.querySelector('.modal-payment');

    closeIcon.addEventListener('click', function() {
        modalPayment.style.display = 'none';
    });

    const form1 = document.querySelector('.form-1');
    const form2 = document.querySelector('.form-2');
    const form3 = document.querySelector('.form-3');
    const btnContinue = form1.querySelector('button');
    const icon = btnContinue.querySelector('i');
    const spinner = btnContinue.querySelector('img');
    const phoneInput = document.getElementById('phone');
    const phoneInput2 = document.getElementById('phone2');
    const phoneInput3 = document.getElementById('phone3');
    const btnRegisterSuccess = document.querySelector('.btn-register-sucess');
    const icon3 = btnRegisterSuccess.querySelector('i');
    const spinner3 = btnRegisterSuccess.querySelector('img');

    btnContinue.addEventListener('click', function(event) {
        event.preventDefault();
    
        if (!phoneInput.value) {
            alert("Por favor, preencha o campo de telefone.");
            btnContinue.innerHTML = 'Continuar <i class="bi bi-arrow-right"></i> <img src="../../public/images/spinner.gif" alt="spinner" style="max-width: 20px; display: none; margin-left: 10px;">';
            return;
        }
    
        btnContinue.innerHTML = 'Buscando usuário <img src="../../public/images/spinner.gif" alt="spinner" style="max-width: 20px; display: block; margin-left: 10px;">';
        icon.style.display = 'none';
        spinner.style.display = 'inline-block';
    
        validarTelefoneNoBanco(phoneInput.value);
    
        setTimeout(() => {
            btnContinue.innerHTML = 'Gerando sua compra <img src="../../public/images/spinner.gif" alt="spinner" style="max-width: 20px; display: block; margin-left: 10px;">';
        }, 1500);
    });
        

    function validarTelefoneNoBanco(phone) {
        phone = phone.replace(') ', ')'); 
        console.log('Validando telefone:', phone); 
        fetch(`/check-phone?phone=${encodeURIComponent(phone)}`)
            .then(response => response.json())
            .then(data => {
                console.log('Dados retornados:', data);
                if (data.success) {
                    enviarFormulario(form1);
                } else {
                    form1.style.display = 'none';
                    phoneInput2.value = phone; 
                    form2.style.display = 'block';
                    btnContinue.firstChild.nodeValue = 'Continuar';
                    icon.style.display = 'inline-block';
                    spinner.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar telefone:', error);
                btnContinue.firstChild.nodeValue = 'Continuar';
                icon.style.display = 'inline-block';
                spinner.style.display = 'none';
            });
    }

    function enviarFormulario(form) {
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = '/compra';
        
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            const tempInput = document.createElement('input');
            tempInput.type = 'hidden';
            tempInput.name = input.name;
            tempInput.value = input.value;
            tempForm.appendChild(tempInput);
        });

        document.body.appendChild(tempForm);
        tempForm.submit();
    }

    form2.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form2);

        fetch('/register', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            form2.style.display = 'none';
            phoneInput3.value = phoneInput2.value; 
            form3.querySelectorAll('input').forEach(input => {
                if (form1[input.name]) {
                    input.value = form1[input.name].value;
                }
            });
            form3.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
            form2.style.display = 'none';
            phoneInput3.value = phoneInput2.value; 
            form3.querySelectorAll('input').forEach(input => {
                if (form1[input.name]) {
                    input.value = form1[input.name].value;
                }
            });
            form3.style.display = 'block';
        });
    });

    form3.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!phoneInput3.value) {
            alert("Por favor, preencha o campo de telefone.");
            btnRegisterSuccess.firstChild.nodeValue = 'Continuar';
            icon3.style.display = 'inline-block';
            spinner3.style.display = 'none';
            return;
        }

        enviarFormulario(form3); 
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const btnRegisterSuccess = document.querySelector('.btn-register-sucess');
    const icon = btnRegisterSuccess.querySelector('i');
    const spinner = btnRegisterSuccess.querySelector('img');

    btnRegisterSuccess.addEventListener('click', function(event) {
        
        btnRegisterSuccess.firstChild.nodeValue = '';
        icon.style.display = 'none';

        spinner.style.display = 'inline-block';
    });
});

document.getElementById('togglePassword').addEventListener('click', function () {
    var passwordInput = document.getElementById('password');
    var toggleIcon = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('bi-eye-slash');
        toggleIcon.classList.add('bi-eye');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('bi-eye');
        toggleIcon.classList.add('bi-eye-slash');
    }
});