document.addEventListener('DOMContentLoaded', function() {
    const inputQuantity = document.querySelector('.input-quantity');
    const maxQuantity = parseInt(document.querySelector('.max-value').value);
    const priceValueElement = document.querySelector('.price-value');
    const priceValue = priceValueElement
    ? parseFloat(priceValueElement.innerText.replace(',', '.'))
    : 0.00;

    const dashIcon = document.querySelector('.bi-dash-circle');
    const plusIcon = document.querySelector('.bi-plus-circle-fill');
    const priceParticipate = document.querySelector('.price-participate');
    const btnAddToCart = document.querySelector('.btn-add-to-cart');
    const modalPayment = document.querySelector('.modal-payment');
    const quantitySelected = document.querySelector('.quantity-selected');

    const quantityInput = document.getElementById('quantity');
    const totalAmountInput = document.getElementById('total-amount');
    const numbersListInput = document.getElementById('numbers-list');

    const qtdPromo1 = document.querySelector('.qtd_promo_1');
    const qtdPromo2 = document.querySelector('.qtd_promo_2');
    const qtdPromo3 = document.querySelector('.qtd_promo_3');
    const pricePromo1 = document.querySelector('.price_promo_1');
    const pricePromo2 = document.querySelector('.price_promo_2');
    const pricePromo3 = document.querySelector('.price_promo_3');

    function updateTotalPrice() {
        let quantity = parseInt(inputQuantity.value) || 0;
        let totalPrice = (quantity * priceValue).toFixed(2).replace('.', ',');

        if (qtdPromo1 && quantity === parseInt(qtdPromo1.textContent)) {
            totalPrice = pricePromo1.textContent.replace('.', ',');
        } else if (qtdPromo2 && quantity === parseInt(qtdPromo2.textContent)) {
            totalPrice = pricePromo2.textContent.replace('.', ',');
        } else if (qtdPromo3 && quantity === parseInt(qtdPromo3.textContent)) {
            totalPrice = pricePromo3.textContent.replace('.', ',');
        }

        if (priceParticipate) {
            priceParticipate.innerText = totalPrice;
        }
        quantityInput.value = quantity;
        totalAmountInput.value = totalPrice;
        quantitySelected.innerText = quantity;
    }

    function updateQuantity(amount) {
        let quantity = parseInt(inputQuantity.value) || 0;
        quantity += amount;

        if (quantity < minQuantity) {
            quantity = minQuantity;
        } else if (quantity > maxQuantity) {
            quantity = maxQuantity;
        }

        inputQuantity.value = quantity;
        updateTotalPrice();

        dashIcon.style.pointerEvents = quantity > minQuantity ? 'auto' : 'none';
    }

    const minQuantity = parseInt(document.querySelector('.input-quantity').value) || 0;
    updateTotalPrice();
    dashIcon.style.pointerEvents = inputQuantity.value > minQuantity ? 'auto' : 'none';

    dashIcon.addEventListener('click', function() {
        updateQuantity(-1);
    });

    plusIcon.addEventListener('click', function() {
        updateQuantity(1);
    });

    document.querySelectorAll('.select').forEach(function(select) {
        select.addEventListener('click', function() {
            const selectValue = parseInt(this.querySelector('h3').innerText);
            updateQuantity(selectValue);
        });
    });

    btnAddToCart.addEventListener('click', function() {
        modalPayment.style.display = 'flex';
    });

    document.querySelectorAll('.qtd_n1, .qtd_n2, .qtd_n3').forEach(function(promo) {
        promo.addEventListener('click', function() {
            const quantityClass = this.classList.contains('qtd_n1') ? 'qtd_promo_1' :
                                 this.classList.contains('qtd_n2') ? 'qtd_promo_2' :
                                 this.classList.contains('qtd_n3') ? 'qtd_promo_3' : '';
            const priceClass = this.classList.contains('qtd_n1') ? 'price_promo_1' :
                               this.classList.contains('qtd_n2') ? 'price_promo_2' :
                               this.classList.contains('qtd_n3') ? 'price_promo_3' : '';
            const promoQuantity = parseInt(document.querySelector('.' + quantityClass).innerText);
            const promoPrice = document.querySelector('.' + priceClass).innerText.replace(',', '.');

            inputQuantity.value = promoQuantity;
            updateTotalPrice();

            if (inputQuantity.value == promoQuantity) {
                priceParticipate.innerText = promoPrice.replace('.', ',');
                totalAmountInput.value = promoPrice.replace('.', ',');
            }
        });
    });

    inputQuantity.addEventListener('input', function() {
        let quantity = parseInt(this.value) || 0;
        if (quantity > maxQuantity) {
            this.value = maxQuantity;
        }
        updateTotalPrice();
    });
});