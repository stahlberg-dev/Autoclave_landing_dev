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

export function LockUnlockPadding (lockPaddingValue, lockPaddingElements) {
    if (document.body.classList.contains('locked')) {

        document.body.style.paddingRight = lockPaddingValue;

        if(lockPaddingElements.length > 0) {

            for (let lockPaddingElement of lockPaddingElements) {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }

        }

    } else {

        document.body.style.paddingRight = '0px';

        if(lockPaddingElements.length > 0) {

            for (let lockPaddingElement of lockPaddingElements) {
                lockPaddingElement.style.paddingRight = '0px';
            }

        }

    }
}