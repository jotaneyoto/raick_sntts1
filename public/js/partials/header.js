document.addEventListener('DOMContentLoaded', function() {
    const titleHeadElement = document.querySelector('.title-head');
    const pageTitle = document.querySelector('title');

    if (titleHeadElement && pageTitle) {
        pageTitle.textContent = pageTitle.textContent.replace('*', titleHeadElement.textContent);
    }
});