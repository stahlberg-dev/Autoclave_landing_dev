import * as flsFunctions from "./functions.js";


export function burger(burgerButtonClassName, 
                       burgerMenuClassName, 
                       burgerMenuLinksClassName, 
                       lockPaddingElementsClassName) {

    const burgerButton = document.querySelector(`.${burgerButtonClassName}`);
    const burgerMenu = document.querySelector(`.${burgerMenuClassName}`);
    const burgerMenuLinks = document.querySelectorAll(`.${burgerMenuLinksClassName}`);
    const lockPaddingElements = document.querySelectorAll(`.${lockPaddingElementsClassName}`);
   
    if (burgerButton && burgerMenu) {
        
        burgerButton.addEventListener("click", function(e) {
                
            if (burgerButton.classList.contains('burger_active')) {
                
                flsFunctions.unlockBody(lockPaddingElements, 300);
                
            } else {
                
                flsFunctions.lockBody(lockPaddingElements, 300);
                
            }

            burgerButton.classList.toggle('burger_active');
            burgerMenu.classList.toggle('menu__body_active');
    
        });

        if (burgerMenuLinks.length > 0) {

            for (let burgerMenuLink of burgerMenuLinks) {

                burgerMenuLink.addEventListener("click", function(e) {
                    
                    if (burgerButton.classList.contains('burger_active')) {

                        burgerButton.classList.remove('burger_active');
                        burgerMenu.classList.remove('menu__body_active');
                        flsFunctions.unlockBody(lockPaddingElements, 300);

                    }
            
                });

            }

        }
    
    }

}