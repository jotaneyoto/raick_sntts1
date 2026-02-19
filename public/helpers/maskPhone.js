function applyPhoneMask() {
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', function() {
        let value = phoneInput.value.replace(/\D/g, '');
        if (value.length > 10) value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3');
        else if (value.length > 5) value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1)$2-$3');
        else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,5})/, '($1)$2');
        else value = value.replace(/^(\d*)/, '($1');
        phoneInput.value = value;
    });
}
applyPhoneMask();