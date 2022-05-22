export function isWebp() {
    function testWebP(callback) {
        let webP = new Image(); 
        webP.onload = webP.onerror = function () { 
            callback(webP.height == 2); 
        }; 
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

export function LockUnlockPadding (lockPaddingValue, lockPadding) {
    if (document.body.classList.contains('locked')) {

        //document.body.style.paddingRight = lockPaddingValue;

        if(lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddingValue;
            }
        }

    } else {

        //document.body.style.paddingRight = '0px';

        if(lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }

    }
}