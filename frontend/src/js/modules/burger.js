import * as flsFunctions from "./functions.js";


export function burger(burgerButton, burgerMenu, lockPaddingElements) {

    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (burgerButton && burgerMenu) {

        burgerButton.addEventListener("click", function(e) {
    
            burgerButton.classList.toggle('burger_active');
            burgerMenu.classList.toggle('menu__body_active');
            document.body.classList.toggle('locked');
    
            flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);
    
        });
    
    }

}