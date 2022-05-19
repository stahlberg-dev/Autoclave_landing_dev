import * as flsFunctions from "./modules/functions.js";
import * as sliders from "./modules/sliders.js";



//----- Webp --------------------------------------------------------------------------------

flsFunctions.isWebp();
//-------------------------------------------------------------------------------------------

// ----- Main slider ------------------------------------------------------------------------

sliders.swiperMainSlider();
//------------------------------------------------------------------------------------------- 

// ----- Rooms slider -----------------------------------------------------------------------

sliders.swiperRoomsSlider();
//-------------------------------------------------------------------------------------------

// ----- Tips slider ------------------------------------------------------------------------

sliders.swiperTipsSlider();
//-------------------------------------------------------------------------------------------

// ----- baguetteBox gallery ----------------------------------------------------------------

sliders.baguetteBoxGallery();
//-------------------------------------------------------------------------------------------  



window.onload = function() {
    document.addEventListener("click", docActions);

    function docActions(e) {
        const targetElement = e.target;

// ----- Burger -----------------------------------------------------------------------------

        const burgerButton = document.querySelector('.burger');

        if (targetElement.classList.contains('burger')) {
            burgerButton.classList.toggle('burger_active');
            document.querySelector('.menu__body').classList.toggle('menu__body_active');
            document.body.classList.toggle('locked');
        }
//-------------------------------------------------------------------------------------------

//----- Click scroll ------------------------------------------------------------------------

        if (targetElement.hasAttribute('data-goto')) {

            const gotoBlock = document.querySelector(targetElement.dataset.goto);

            if (gotoBlock) {

                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + 
                                       pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 20;
    
                if (burgerButton.classList.contains('burger_active')) {
                    burgerButton.classList.toggle('burger_active');
                    document.querySelector('.menu__body').classList.toggle('menu__body_active');
                    document.body.classList.toggle('locked');
                }
    
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
    
                e.preventDefault();
            }
        }

//-------------------------------------------------------------------------------------------

    }

//----- Header scroll -----------------------------------------------------------------------
        
    const headerElement = document.querySelector('.header');

    const callback = function(entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('header_scroll');
        } else {
            headerElement.classList.add('header_scroll');
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);
//-------------------------------------------------------------------------------------------

};