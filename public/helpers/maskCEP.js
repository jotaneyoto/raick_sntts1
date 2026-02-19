function applyCepMask() {
    const cepInput = document.getElementById('cep');

    if (cepInput) {
        cepInput.addEventListener('input', function() {
            let value = cepInput.value.replace(/\D/g, '');
            if (value.length > 5) value = value.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
            else value = value.replace(/^(\d*)/, '$1');
            cepInput.value = value;
        });
    }
}
applyCepMask();