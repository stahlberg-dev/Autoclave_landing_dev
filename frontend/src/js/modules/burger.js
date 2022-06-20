import * as flsFunctions from "./functions.js";


export function burger(burgerButton, burgerMenu, burgerMenuLinks, lockPaddingElements) {
   
    if (burgerButton && burgerMenu) {
        
        burgerButton.addEventListener("click", function(e) {

            const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
            
            burgerButton.classList.toggle('burger_active');
            burgerMenu.classList.toggle('menu__body_active');
            document.body.classList.toggle('locked');
    
            flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);
    
        });

        if (burgerMenuLinks.length > 0) {

            for (let burgerMenuLink of burgerMenuLinks) {

                burgerMenuLink.addEventListener("click", function(e) {
                    
                    if (burgerButton.classList.contains('burger_active')) {

                        burgerButton.classList.remove('burger_active');
                        burgerMenu.classList.remove('menu__body_active');
                        document.body.classList.remove('locked');
            
                        flsFunctions.LockUnlockPadding ('0px', lockPaddingElements);

                    }
            
                });

            }

        }
    
    }

}