import * as flsFunctions from "./modules/functions.js";
import * as sliders from "./modules/sliders.js";



//----- Webp --------------------------------------------------------------------------------

flsFunctions.isWebp();
//-------------------------------------------------------------------------------------------

// ----- About slider -----------------------------------------------------------------------

sliders.swiperAboutSlider();
//------------------------------------------------------------------------------------------- 

// ----- API --------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------

// ----- Popups -----------------------------------------------------------------------------

/* const popupLinks = document.querySelectorAll('.popup-link');
const lockPaddingElements = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 300;

if (popupLinks.length > 0) {
    for (let popupLink of popupLinks) {

        popupLink.addEventListener("click", function(e) {
            const popupName = popupLink.dataset.popup;
            const currentPopup = document.querySelector(`[data-popup-name="${popupName}"]`);
            popupOpen(currentPopup);
        });

    }
}

const popupCloseButtons = document.querySelectorAll('.close-popup');

if (popupCloseButtons.length > 0) {
    for (let popupCloseButton of popupCloseButtons) {

        popupCloseButton.addEventListener('click', function(e) {
            popupClose(popupCloseButton.closest('.popup'));
        });

    }
}

function popupOpen (currentPopup) {
    if (currentPopup && unlock) {

        const popupActive = document.querySelector('.popup.popup_opened');

        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }

        currentPopup.classList.add('popup_opened');

        currentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });

    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {

        popupActive.classList.remove('popup_opened');

        if (doUnlock) {
            bodyUnLock();
        }

    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    document.body.classList.add('locked');
    flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);

    let scroller = document.createElement('div');
    scroller.className = "scroller";
    document.body.append(scroller);

    unlock = false;

    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {

    setTimeout(function() {
        
        document.body.classList.remove('locked');
        flsFunctions.LockUnlockPadding ('0px', lockPaddingElements);
        if (document.querySelector('.scroller')) {
            document.querySelector('.scroller').remove();
        }

    }, timeout);

    unlock = false;
    
    setTimeout(function() {
        unlock = true;
    }, timeout);

}

document.addEventListener('keydown', function(e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.popup_opened');
        popupClose(popupActive);
    }
}); */
//-------------------------------------------------------------------------------------------



window.onload = function() {

    document.addEventListener("click", docActions);

    function docActions(e) {
        const targetElement = e.target;
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';  
        const lockPaddingElements = document.querySelectorAll('.lock-padding');

// ----- Burger -----------------------------------------------------------------------------

        const burgerButton = document.querySelector('.burger');

        if (targetElement.classList.contains('burger')) {
            burgerButton.classList.toggle('burger_active');
            document.querySelector('.menu__body').classList.toggle('menu__body_active');
            document.body.classList.toggle('locked');

            flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);

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

                    flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);
                }
    
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
    
                e.preventDefault();
            }
        }

//-------------------------------------------------------------------------------------------

//----- Perfection spoilers -----------------------------------------------------------------
        
        const mediaQueryHover = window.matchMedia('(any-hover: none)');
        const hideTime = 300;

        if (mediaQueryHover.matches) {
            
            const activeBlocks = document.querySelectorAll('.perfection__block_active');
            
            if (activeBlocks.length > 0 && !targetElement.closest('.perfection__block_active')) {
                for (let item of activeBlocks) {
                    item.classList.remove('perfection__block_active');

                    setTimeout(() => {
                        item.querySelector('.hidden-description').style.visibility = '';
                    }, hideTime);
                }
            }
            
            const closestBlock = targetElement.closest('.perfection__block:not(:last-child)');

            if (closestBlock) {
                if (closestBlock.classList.contains('perfection__block_active')) {

                    closestBlock.classList.remove('perfection__block_active');

                    setTimeout(() => {
                        closestBlock.querySelector('.hidden-description').style.visibility = '';
                    }, hideTime);

                } else {

                    closestBlock.classList.add('perfection__block_active');
                    closestBlock.querySelector('.hidden-description').style.visibility = 'visible';

                }
            }
        }
//-------------------------------------------------------------------------------------------

// ----- Popups -----------------------------------------------------------------------------

        const popupLink = targetElement.closest('.popup-link');
        const popupCloseButton = targetElement.closest('.close-popup');
        const timeout = 300;

        let unlock = true;

        if (popupLink) {
            const popupName = popupLink.dataset.popup;
            const currentPopup = document.querySelector(`[data-popup-name="${popupName}"]`);
            popupOpen(currentPopup);
        }

        if (popupCloseButton) {
            popupClose(popupCloseButton.closest('.popup'));
        }

        if (document.querySelector('.popup_opened')) {

            if (!targetElement.closest('.popup__content')) {
                popupClose(targetElement.closest('.popup'));
            }

        }

        function popupOpen (currentPopup) {
            if (currentPopup && unlock) {

                const popupActive = document.querySelector('.popup_opened');

                if (popupActive) {
                    popupClose(popupActive, false);
                } else {
                    bodyLock();
                }

                currentPopup.classList.add('popup_opened');

                if (currentPopup.dataset.popupName == 'perfectionVideo' && 
                    !currentPopup.querySelector('iframe')) {

                    const ytFrame = document.createElement('iframe');
                    ytFrame.className = "perfection-popup__ytplayer-video";
                    ytFrame.setAttribute('src', "https://www.youtube.com/embed/AWuzMG4atiw");
                    ytFrame.setAttribute('allow', 'fullscreen');
                    ytFrame.setAttribute('frameborder', '0');
                    currentPopup.querySelector('.popup__content').append(ytFrame); 

                }

            }
        }

        function popupClose(popupActive, doUnlock = true) {
            if (unlock) {

                const youtFrame = popupActive.querySelector('iframe');

                if (youtFrame) {
                    /* youtFrame.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*'); */
                    youtFrame.remove();
                }

                popupActive.classList.remove('popup_opened');

                if (doUnlock) {
                    bodyUnLock();
                }

            }
        }

        function bodyLock() {
            document.body.classList.add('locked');
            flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);

            let scroller = document.createElement('div');
            scroller.className = "scroller";
            document.body.append(scroller);

            unlock = false;

            setTimeout(function() {
                unlock = true;
            }, timeout);
        }

        function bodyUnLock() {

            setTimeout(function() {
                
                document.body.classList.remove('locked');
                flsFunctions.LockUnlockPadding ('0px', lockPaddingElements);

                if (document.querySelector('.scroller')) {
                    document.querySelector('.scroller').remove();
                }

            }, timeout);

            unlock = false;
            
            setTimeout(function() {
                unlock = true;
            }, timeout);

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