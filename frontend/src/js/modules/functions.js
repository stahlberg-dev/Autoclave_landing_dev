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

export function lockBody (lockPaddingElements, disablePointer = 0) {

    if (!document.body.classList.contains('locked')) {

        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

        document.body.classList.add('locked');
        document.body.style.paddingRight = lockPaddingValue;

        if(lockPaddingElements.length > 0) {

            for (let lockPaddingElement of lockPaddingElements) {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            }

        }

        let scroller = document.createElement('div');
        scroller.className = "scroller";
        scroller.classList.add('disable-pointer');
        document.body.append(scroller);

        setTimeout(function() {

            scroller.classList.remove('disable-pointer');

        }, disablePointer);

    }

}

export function unlockBody (lockPaddingElements, unlockDelay = 0) {

    if (document.body.classList.contains('locked')) {

        const scroller = document.querySelector('.scroller');

        if (scroller) {

            scroller.classList.add('disable-pointer');

        }

        setTimeout(function() {
            
            document.body.classList.remove('locked');
            document.body.style.paddingRight = '0px';
            
            if(lockPaddingElements.length > 0) {
                
                for (let lockPaddingElement of lockPaddingElements) {
                    lockPaddingElement.style.paddingRight = '0px';
                }
                
            }
            
            if (scroller) {
                scroller.remove();
            }
    
        }, unlockDelay);

    } 

}