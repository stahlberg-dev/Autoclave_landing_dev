import * as flsFunctions from "./modules/functions.js";
import * as sliders from "./modules/sliders.js";
import * as forms from "./modules/forms.js";
import * as burgerModule from "./modules/burger.js";
import * as popups from "./modules/popups.js";
import * as spoilersModule from "./modules/spoilers.js";
import * as masks from "./modules/masks.js";


//----- Webp --------------------------------------------------------------------------------

flsFunctions.isWebp();
//-------------------------------------------------------------------------------------------

// ----- About slider -----------------------------------------------------------------------

sliders.swiperAboutSlider();
//------------------------------------------------------------------------------------------- 

// ----- Autoclave-18 sliders ---------------------------------------------------------------

sliders.autoclaveSliders_18();
//-------------------------------------------------------------------------------------------

// ----- Autoclave-26 sliders ---------------------------------------------------------------

sliders.autoclaveSliders_26();
//------------------------------------------------------------------------------------------- 

// ----- Autoclave-35 sliders ---------------------------------------------------------------

sliders.autoclaveSliders_35();
//------------------------------------------------------------------------------------------- 

// ----- Work slider ------------------------------------------------------------------------

sliders.workSlider();
//------------------------------------------------------------------------------------------- 

// ----- Comparison slider ------------------------------------------------------------------

sliders.comparisonSlider();
//------------------------------------------------------------------------------------------- 

// ----- FORMS ------------------------------------------------------------------------------

forms.startForms();
//-------------------------------------------------------------------------------------------

// ----- Burger -----------------------------------------------------------------------------
  
const lockPaddingElements = document.querySelectorAll('.lock-padding');
const burgerButton = document.querySelector('.burger');
const burgerMenu = document.querySelector('.menu__body');

burgerModule.burger(burgerButton, burgerMenu, lockPaddingElements);
//-------------------------------------------------------------------------------------------

// ----- Popups -----------------------------------------------------------------------------

const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseButtons = document.querySelectorAll('.close-popup');
const timeout = 300;

popups.start(popupLinks, popupCloseButtons, lockPaddingElements, timeout);
//-------------------------------------------------------------------------------------------

//----- Click scroll ------------------------------------------------------------------------
/* 
const scrollLinks = document.querySelectorAll('[data-goto]');
const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'; 
let clickedPageButton;

if (scrollLinks.length > 0) {
    for (let scrollLink of scrollLinks) {

        scrollLink.addEventListener("click", function(e) {
            
            const gotoBlock = document.querySelector(scrollLink.dataset.goto);

            if (gotoBlock) {

                let gotoBlockValue;
        
                if (gotoBlock.classList.contains('characteristics-header') || 
                    gotoBlock.classList.contains('complectation-header')) {
        
                    gotoBlockValue = document.querySelector('.equipment').getBoundingClientRect().top + 
                                     pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 20;
        
                } else {
        
                    gotoBlockValue = gotoBlock.getBoundingClientRect().top + 
                                     pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 20;
        
                }
        
        
                if (burgerButton.classList.contains('burger_active')) {
                    burgerButton.classList.toggle('burger_active');
                    document.querySelector('.menu__body').classList.toggle('menu__body_active');
                    document.body.classList.toggle('locked');
        
                    flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);
                }
        
                if (gotoBlock.classList.contains('characteristics-header') && 
                    !gotoBlock.classList.contains('equipment__header-content_active')) {
        
                    clickedPageButton = document.querySelector('.equipment-header__button[data-button=".characteristics"]');
        
                }
        
                if (gotoBlock.classList.contains('complectation-header') && 
                    !gotoBlock.classList.contains('equipment__header-content_active')) {
        
                    clickedPageButton = document.querySelector('.equipment-header__button[data-button=".complectation"]');
        
                }
        
                const equipmentVideo = document.querySelector('.complectation');
        
                if (equipmentVideo && !gotoBlock.classList.contains('complectation-header')) {
                    equipmentVideo.classList.add('equipment__body-content_locked');
                }
        
                const aboutSection = document.querySelector('.about');
        
                if (!gotoBlock.classList.contains('about') && aboutSection) {
                    aboutSection.classList.add('about_locked');
                }
        
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
        
                if (equipmentVideo) {
                    setTimeout(() => {
                        equipmentVideo.classList.remove('equipment__body-content_locked');
                    }, 1000);
                }
        
                if (aboutSection) {
                    setTimeout(() => {
                        aboutSection.classList.remove('about_locked');
                    }, 1000);
                }
        
                e.preventDefault();
            }

        });

    }
} */
//-------------------------------------------------------------------------------------------

//----- Liter tabs -------------------------------------------------------------------------

const changeSliderTime = 300;
const literTabButtons = document.querySelectorAll('[data-code]');
let unlockTab = true;

if (document.querySelector('.slider-gallery_active')) {
    document.querySelector('.slider-gallery_active').style.visibility = 'visible';
}

if (literTabButtons.length > 0) {
    for (let literTabButton of literTabButtons) {


        literTabButton.addEventListener("click", function(e) {
            
            if (!literTabButton.classList.contains('liter-buttons__button_active') && unlockTab) {
                
                const activeTabButtons = document.querySelectorAll('.liter-buttons__button_active');
                unlockTab = false;

                if (activeTabButtons.length > 0) {

                    for (let activeTabButton of activeTabButtons) {
        
                        const activeTabButtonName = activeTabButton.dataset.code;
                        const activeSlider = document.querySelector(`[data-tab="${activeTabButtonName}"]`);
        
                        activeTabButton.classList.remove('liter-buttons__button_active');
                        
                        if (activeSlider) {
                            
                            activeSlider.classList.remove('slider-gallery_active');
        
                            setTimeout(() => {

                                activeSlider.style.visibility = '';

                            }, changeSliderTime);
        
                        }
        
                    }
        
                }
        
                const literTabButtonName = literTabButton.dataset.code;
                const newActiveSlider = document.querySelector(`[data-tab="${literTabButtonName}"]`);
        
                if (newActiveSlider) {
                    newActiveSlider.classList.add('slider-gallery_active');
                    newActiveSlider.style.visibility = 'visible';
                }
        
                const newActiveTabButtons = document.querySelectorAll(`[data-code="${literTabButtonName}"]:not([data-goto])`);

                if (newActiveTabButtons.length > 0) {

                    for (let newActiveTabButton of newActiveTabButtons) {

                        newActiveTabButton.classList.add('liter-buttons__button_active');

                    }

                }

                setTimeout(() => {
                    unlockTab = true;
                }, changeSliderTime);
        
            }

        });

    }
}
//-------------------------------------------------------------------------------------------

//----- Spoilers ----------------------------------------------------------------------------

const spoilerClassName = 'spoiler';
const spoilerBlockClassName = 'spoiler-block';
const hideTime = 300;

spoilersModule.spoilers(spoilerClassName, spoilerBlockClassName, hideTime);
//-------------------------------------------------------------------------------------------

// ----- Phone mask -------------------------------------------------------------------------

const phoneInputs = document.querySelectorAll('.jsPhone');

masks.phoneMask(phoneInputs);
//------------------------------------------------------------------------------------------- 

// ----- Promo mask -------------------------------------------------------------------------

//const promoInputs = document.querySelectorAll('.jsPromoCodeInput');

//masks.promoMask(promoInputs);
//------------------------------------------------------------------------------------------- 




// ----- Make active equipment page visible -------------------------------------------------

const startEquipmentTitle = document.querySelector('.equipment__header-content_active');
const startEquipmentBodyContent = document.querySelector('.equipment__body-content_active');

if (startEquipmentTitle) {

    const startTitleHeight = startEquipmentTitle.offsetHeight + 'px';
            
    if (document.querySelector('.equipment__header')) {
        document.querySelector('.equipment__header').style.height = startTitleHeight;
    }

    startEquipmentTitle.style.visibility = 'visible';
}

if ( startEquipmentBodyContent) {

    const startEquipmentBodyHeight = startEquipmentBodyContent.offsetHeight + 'px';
            
    if (document.querySelector('.equipment__body')) {
        document.querySelector('.equipment__body').style.height = startEquipmentBodyHeight;
    }

    startEquipmentBodyContent.style.visibility = 'visible';
}

window.addEventListener('resize', function() {

    const activeEquipmentTitle = document.querySelector('.equipment__header-content_active');
    const activeEquipmentBodyContent = document.querySelector('.equipment__body-content_active');
    
    if (activeEquipmentTitle) {

        const activeEquipmentTitleHeight = activeEquipmentTitle.offsetHeight + 'px';

        if (document.querySelector('.equipment__header')) {
            document.querySelector('.equipment__header').style.height = activeEquipmentTitleHeight;
        }

    }

    if (activeEquipmentBodyContent) {

        const activeEquipmentBodyHeight = activeEquipmentBodyContent.offsetHeight + 'px';

        if (document.querySelector('.equipment__body')) {
            document.querySelector('.equipment__body').style.height = activeEquipmentBodyHeight;
        }

    }

});
//-------------------------------------------------------------------------------------------    

    document.addEventListener("click", docActions);

    function docActions(e) {
        const targetElement = e.target;
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';  
        const lockPaddingElements = document.querySelectorAll('.lock-padding');

// ----- Burger -----------------------------------------------------------------------------

        /* const burgerButton = document.querySelector('.burger');

        if (targetElement.classList.contains('burger')) {
            burgerButton.classList.toggle('burger_active');
            document.querySelector('.menu__body').classList.toggle('menu__body_active');
            document.body.classList.toggle('locked');

            flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);

        } */
//-------------------------------------------------------------------------------------------

//----- Click scroll ------------------------------------------------------------------------

        let clickedPageButton;

        if (targetElement.hasAttribute('data-goto')) {

            const gotoBlock = document.querySelector(targetElement.dataset.goto);

            if (gotoBlock) {

                let gotoBlockValue;

                if (gotoBlock.classList.contains('characteristics-header') || 
                    gotoBlock.classList.contains('complectation-header')) {

                    gotoBlockValue = document.querySelector('.equipment').getBoundingClientRect().top + 
                                     pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 20;

                } else {

                    gotoBlockValue = gotoBlock.getBoundingClientRect().top + 
                                     pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 20;

                }

    
                if (burgerButton.classList.contains('burger_active')) {
                    burgerButton.classList.toggle('burger_active');
                    document.querySelector('.menu__body').classList.toggle('menu__body_active');
                    document.body.classList.toggle('locked');

                    flsFunctions.LockUnlockPadding (lockPaddingValue, lockPaddingElements);
                }

                if (gotoBlock.classList.contains('characteristics-header') && 
                    !gotoBlock.classList.contains('equipment__header-content_active')) {

                    clickedPageButton = document.querySelector('.equipment-header__button[data-button=".characteristics"]');

                }

                if (gotoBlock.classList.contains('complectation-header') && 
                    !gotoBlock.classList.contains('equipment__header-content_active')) {

                    clickedPageButton = document.querySelector('.equipment-header__button[data-button=".complectation"]');

                }

                const equipmentVideo = document.querySelector('.complectation');

                if (equipmentVideo && !gotoBlock.classList.contains('complectation-header')) {
                    equipmentVideo.classList.add('equipment__body-content_locked');
                }

                const aboutSection = document.querySelector('.about');

                if (!gotoBlock.classList.contains('about') && aboutSection) {
                    aboutSection.classList.add('about_locked');
                }
    
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });

                if (equipmentVideo) {
                    setTimeout(() => {
                        equipmentVideo.classList.remove('equipment__body-content_locked');
                    }, 1000);
                }

                if (aboutSection) {
                    setTimeout(() => {
                        aboutSection.classList.remove('about_locked');
                    }, 1000);
                }
    
                e.preventDefault();
            }
        }
//-------------------------------------------------------------------------------------------

//----- Spoilers ----------------------------------------------------------------------------
        
        /* const mediaQueryHover = window.matchMedia('(any-hover: none)');
        const hideTime = 300;

        if (mediaQueryHover.matches) {
            
            const activeBlocks = document.querySelectorAll('.spoiler-block_active');
            
            if (activeBlocks.length > 0 && !targetElement.closest('.spoiler-block_active')) {
                for (let item of activeBlocks) {
                    item.classList.remove('spoiler-block_active');

                    setTimeout(() => {
                        item.querySelector('.spoiler').style.visibility = '';
                    }, hideTime);
                }
            }
            
            const closestBlock = targetElement.closest('.spoiler-block');

            if (closestBlock) {
                if (closestBlock.classList.contains('spoiler-block_active')) {

                    closestBlock.classList.remove('spoiler-block_active');

                    setTimeout(() => {
                        closestBlock.querySelector('.spoiler').style.visibility = '';
                    }, hideTime);

                } else {

                    closestBlock.classList.add('spoiler-block_active');
                    closestBlock.querySelector('.spoiler').style.visibility = 'visible';

                }
            }
        } */
//-------------------------------------------------------------------------------------------

//----- Slider tabs -------------------------------------------------------------------------
/* 
        const changeSliderTime = 300;
        const clickedTabButton = targetElement.closest('.slider-tab-button');
        const activeTabButtons = document.querySelectorAll('.slider-tab-button_active');
        
        if (clickedTabButton) {

            if (!clickedTabButton.classList.contains('slider-tab-button_active')) {

                if (activeTabButtons.length > 0) {

                    for (let activeTabButton of activeTabButtons) {

                        const activeTabButtonName = activeTabButton.dataset.code;
                        const activeSlider = document.querySelector(`[data-tab="${activeTabButtonName}"]`);

                        if (activeSlider) {

                            activeSlider.classList.remove('slider-gallery_active');

                            setTimeout(() => {
                                activeSlider.style.visibility = '';
                            }, changeSliderTime);

                        }

                        activeTabButton.classList.remove('slider-tab-button_active');
                        
                    }

                }

                const clickedTabButtonName = clickedTabButton.dataset.code;
                const newActiveSlider = document.querySelector(`[data-tab="${clickedTabButtonName}"]`);

                if (newActiveSlider) {
                    newActiveSlider.classList.add('slider-gallery_active');
                    newActiveSlider.style.visibility = 'visible';
                }

                clickedTabButton.classList.add('slider-tab-button_active');

            }

        } */
//-------------------------------------------------------------------------------------------

//----- Equipment pages ---------------------------------------------------------------------

        const changePageTime = 150;
        const hiddenTitle = document.querySelector('.equipment__header-content:not(.equipment__header-content_active)');
        const visiblePage = document.querySelector('.equipment__body-content_active');

        if (!clickedPageButton) {
            clickedPageButton = targetElement.closest('.equipment-header__button');
        }

        if (clickedPageButton && visiblePage) {


            clickedPageButton.closest('.equipment__header-content').classList.remove('equipment__header-content_active');
            visiblePage.classList.remove('equipment__body-content_active');

            setTimeout(() => {

                clickedPageButton.closest('.equipment__header-content').style.visibility = '';

            }, changePageTime);

            setTimeout(() => {

                visiblePage.style.visibility = '';

            }, changePageTime * 2);

            const clickedPageButtonName = clickedPageButton.dataset.button;
            const newVisiblePage = document.querySelector(clickedPageButtonName);

            if (newVisiblePage) {

                const pageContentHeight = newVisiblePage.offsetHeight + 'px';

                document.querySelector('.equipment__body').style.height = pageContentHeight;
                newVisiblePage.classList.add('equipment__body-content_active');
                newVisiblePage.style.visibility = 'visible';

                if (newVisiblePage.classList.contains('complectation') &&
                    !newVisiblePage.classList.contains('equipment__body-content_no-play')) {

                        document.querySelector('.complectation__video').play();
                        newVisiblePage.classList.add('equipment__body-content_no-play');

                    }
            }

            if (hiddenTitle) {

                const titleHeight = hiddenTitle.offsetHeight + 'px';

                document.querySelector('.equipment__header').style.height = titleHeight;

                setTimeout(() => {

                    hiddenTitle.classList.add('equipment__header-content_active');
                    hiddenTitle.style.visibility = 'visible';

                }, changePageTime);

            }

        }
//-------------------------------------------------------------------------------------------

//----- Order tabs --------------------------------------------------------------------------
/* 
        const clickedOrderTabButton = targetElement.closest('.order-tab-button');
        const activeOrderTabButtons = document.querySelectorAll('.order-tab-button_active');

        if (clickedOrderTabButton) {

            if (!clickedOrderTabButton.classList.contains('order-tab-button_active')) {

                if (activeOrderTabButtons.length > 0) {

                    for (let activeOrderTabButton of activeOrderTabButtons) {

                        activeOrderTabButton.classList.remove('order-tab-button_active');
                        
                    }

                }

                clickedOrderTabButton.classList.add('order-tab-button_active');

            }

        } */
//-------------------------------------------------------------------------------------------

// ----- Popups -----------------------------------------------------------------------------
/* 
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
                    !currentPopup.querySelector('video')) {

                        const mp4Source = document.createElement('source');
                        mp4Source.setAttribute('src', "video/work.mp4");
                        mp4Source.setAttribute('type', "video/mp4");
    
                        const ogvSource = document.createElement('source');
                        ogvSource.setAttribute('src', "video/work.ogv");
                        ogvSource.setAttribute('type', "video/ogg");
    
                        const videoFrame = document.createElement('video');
                        videoFrame.className = "perfection-popup__video";
                        videoFrame.setAttribute('autoplay', 'autoplay');
                        videoFrame.setAttribute('controls', 'controls');
    
                        videoFrame.append(mp4Source);
                        videoFrame.append(ogvSource);
                        currentPopup.querySelector('.popup__content').append(videoFrame);

                }

                if (currentPopup.dataset.popupName == 'workVideo' && 
                    !currentPopup.querySelector('video')) {

                    const mp4Source = document.createElement('source');
                    mp4Source.setAttribute('src', "video/work.mp4");
                    mp4Source.setAttribute('type', "video/mp4");

                    const ogvSource = document.createElement('source');
                    ogvSource.setAttribute('src', "video/work.ogv");
                    ogvSource.setAttribute('type', "video/ogg");

                    const videoFrame = document.createElement('video');
                    videoFrame.className = "work-popup__video";
                    videoFrame.setAttribute('autoplay', 'autoplay');
                    videoFrame.setAttribute('controls', 'controls');

                    videoFrame.append(mp4Source);
                    videoFrame.append(ogvSource);
                    currentPopup.querySelector('.popup__content').append(videoFrame); 

                }

            }
        }

        function popupClose(popupActive, doUnlock = true) {
            if (unlock) {

                const videoFrame = popupActive.querySelector('video');

                if (videoFrame) {
                    setTimeout(() => {
                        videoFrame.pause();
                    }, timeout);
                }

                if (popupActive.dataset.popupName == 'consultation') {

                    setTimeout(() => {
                        popupActive.querySelectorAll('input[type=text]').forEach(element => element.value = '');
                    }, timeout);

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
 */
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

//----- Auto scroll -------------------------------------------------------------------------

document.addEventListener("scroll", function(e) {
    
    const equipmentSection = document.querySelector('.equipment');

    if (equipmentSection) {

        const equipmentScrollSpace = document.documentElement.clientHeight - 
                                        equipmentSection.getBoundingClientRect().top;

        if ((equipmentScrollSpace > 0) && 
            (equipmentScrollSpace < equipmentSection.offsetHeight + 
            document.documentElement.clientHeight) ) {

            const equipmentVideo = document.querySelector('.complectation');

            if (equipmentVideo) {

                if (equipmentVideo.classList.contains('equipment__body-content_active') && 
                    !equipmentVideo.classList.contains('equipment__body-content_no-play') &&
                    !equipmentVideo.classList.contains('equipment__body-content_locked')) {
                    
                    const gotoVideoValue = equipmentVideo.getBoundingClientRect().top + 
                                            pageYOffset - document.querySelector('.header__wrapper').offsetHeight;

                    window.scrollTo({
                        top: gotoVideoValue,
                        behavior: "smooth"
                    });

                    document.querySelector('.complectation__video').play();
                    equipmentVideo.classList.add('equipment__body-content_no-play');

                }

            }
            
        }

    }

    const aboutSection = document.querySelector('.about');

    if (aboutSection) {

        const aboutScrollSpace = document.documentElement.clientHeight - 
                                    aboutSection.getBoundingClientRect().top;

        if ((aboutScrollSpace > 0) && 
            (aboutScrollSpace < aboutSection.offsetHeight + 
            document.documentElement.clientHeight) ) {

            if (!aboutSection.classList.contains('about_shown') &&
                !aboutSection.classList.contains('about_locked')) {

                const gotoAboutSectionValue = aboutSection.getBoundingClientRect().top + 
                                                pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 20;

                window.scrollTo({
                    top: gotoAboutSectionValue,
                    behavior: "smooth"
                });

                aboutSection.classList.add('about_shown');

            }
            
        }

    }

});
//-------------------------------------------------------------------------------------------

//----- Start animation ------------------------------------------------------------

const complectationBody = document.querySelector('.complectation');
const complectationVideo = document.querySelector('.complectation__video');

if (complectationBody && complectationVideo) {

    complectationVideo.addEventListener("ended", function() {
        
        complectationBody.classList.add('complectation_start-animation');

    }, false);

}
//-------------------------------------------------------------------------------------------
