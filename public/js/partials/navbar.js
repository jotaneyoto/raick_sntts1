document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('#showPopupButton').addEventListener('click', () => {
        const popupNav = document.querySelector('.popup-nav');
        popupNav.classList.add('show');
    });

    document.querySelector('#closePopupButton').addEventListener('click', () => {
        const popupNav = document.querySelector('.popup-nav');
        popupNav.classList.remove('show');
    });
});