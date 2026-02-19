function applyDateMask() {
    const dateInput = document.getElementById('age');

    if (dateInput) {
        dateInput.addEventListener('input', function() {
            let value = dateInput.value.replace(/\D/g, '');
            if (value.length > 8) value = value.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
            else if (value.length > 4) value = value.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
            else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
            else value = value.replace(/^(\d*)/, '$1');
            dateInput.value = value;
        });
    }
}

applyDateMask();