window.onloadTurnstileCallback = function () {
    turnstile.render('#turnstileWidget', {
        sitekey: '0x4AAAAAAAfqzm9_KK7B52xE',
        callback: function (token) {
            console.log(`Challenge Success ${token}`);
            // window.location.href = 'https://www.google.com';
        },
        'theme': 'light', // Optional: Adjust to match your design
    });
};