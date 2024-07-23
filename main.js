



window.onloadTurnstileCallback = function () {
    turnstile.render('#myWithget', {
        sitekey: '0x4AAAAAAAfqzm9_KK7B52xE',
        callback: function(token) {
            console.log(`Challenge Success ${token}`);
        },
    });
};