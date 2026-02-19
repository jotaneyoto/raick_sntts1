function applyCpfMask() {
    const cpfInput = document.getElementById('cpf');

    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            let value = cpfInput.value.replace(/\D/g, '');
            if (value.length > 9) value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
            else if (value.length > 6) value = value.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
            else if (value.length > 3) value = value.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
            else value = value.replace(/^(\d*)/, '$1');
            cpfInput.value = value;
        });
    }
}
applyCpfMask();