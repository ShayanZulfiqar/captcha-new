window.onloadTurnstileCallback = function () {
    turnstile.render('#myWithget', {
        sitekey: '0x4AAAAAAAfqzm9_KK7B52xE',
        callback: function(token) {
            console.log(`Challenge Success ${token}`);
            window.location.href = 'https://www.google.com';
        },
    });
};


document.getElementById('turnstile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var token = turnstile.getResponse();
    if (token) {
        window.location.href = 'https://www.google.com';
    } else {
        alert('Please complete the CAPTCHA');
    }
});