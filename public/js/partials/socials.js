function share(platform) {
    const pageUrl = window.location.href;
    const name = document.querySelector('.background-gradient h3').textContent;
    const campaignName = encodeURIComponent(name);
    
    let url;
    if (platform === 'facebook') {
        url = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    } else if (platform === 'telegram') {
        url = `https://t.me/share/url?url=${pageUrl}&text=Confira a campanha ${campaignName}`;
    } else if (platform === 'twitter') {
        url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=Confira a campanha ${campaignName}`;
    } else if (platform === 'whatsapp') {
        url = `https://wa.me/?text=Confira a campanha ${campaignName} em ${pageUrl}`;
    }

    window.open(url, '_blank');
}