import * as flsFunctions from "./modules/functions.js";
import * as sliders from "./modules/sliders.js";
import * as forms from "./modules/forms.js";
import * as headerScrollModule from "./modules/header_scroll.js";
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

//----- Header scroll -----------------------------------------------------------------------
        
const headerClassName = 'header';
const scrolledHeaderClassName = 'header_scroll';

headerScrollModule.headerScroll(headerClassName, scrolledHeaderClassName);
//-------------------------------------------------------------------------------------------

// ----- Burger -----------------------------------------------------------------------------
  
const lockPaddingElements = document.querySelectorAll('.lock-padding');
const burgerButton = document.querySelector('.burger');
const burgerMenu = document.querySelector('.menu__body');
const burgerMenuLinks = document.querySelectorAll('.menu__link');

burgerModule.burger(burgerButton, burgerMenu, burgerMenuLinks, lockPaddingElements);
//-------------------------------------------------------------------------------------------

// ----- Popups -----------------------------------------------------------------------------

const popupLinks = document.querySelectorAll('.popup-link');
const popupCloseButtons = document.querySelectorAll('.close-popup');
const timeout = 300;

popups.start(popupLinks, popupCloseButtons, lockPaddingElements, timeout);
//-------------------------------------------------------------------------------------------

// ----- Phone mask -------------------------------------------------------------------------

const phoneInputs = document.querySelectorAll('.jsPhone');

masks.phoneMask(phoneInputs);
//------------------------------------------------------------------------------------------- 

// ----- Promo mask -------------------------------------------------------------------------

//const promoInputs = document.querySelectorAll('.jsPromoCodeInput');

//masks.promoMask(promoInputs);
//------------------------------------------------------------------------------------------- 

//----- Equipment pages ---------------------------------------------------------------------

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

const changePageTime = 150;
const pageButtons = document.querySelectorAll('[data-page-button]');

if (pageButtons.length > 0) {

    for (let pageButton of pageButtons) {

        pageButton.addEventListener("click", function(e) {
                    
            const pageButtonName = pageButton.dataset.pageButton;
            const visiblePageHeader = document.querySelector(`.${pageButtonName}-header`);
            const visiblePage = document.querySelector(`.${pageButtonName}`);

            if (visiblePageHeader && visiblePage) {

                if (!visiblePageHeader.classList.contains('equipment__header-content_active')) {

                    const hiddenTitle = document.querySelector('.equipment__header-content_active');
                    const hiddenPage = document.querySelector('.equipment__body-content_active');

                    if (hiddenTitle && hiddenPage) {

                        hiddenTitle.classList.remove('equipment__header-content_active');
                        hiddenPage.classList.remove('equipment__body-content_active');

                        setTimeout(() => {

                            hiddenTitle.visibility = '';

                        }, changePageTime);

                        setTimeout(() => {

                            hiddenPage.style.visibility = '';

                        }, changePageTime * 2);

                    }

                    const titleHeight = visiblePageHeader.offsetHeight + 'px';
                    const pageContentHeight = visiblePage.offsetHeight + 'px';

                    document.querySelector('.equipment__header').style.height = titleHeight;
                    document.querySelector('.equipment__body').style.height = pageContentHeight;

                    setTimeout(() => {

                        visiblePageHeader.classList.add('equipment__header-content_active');
                        visiblePageHeader.style.visibility = 'visible';

                    }, changePageTime);

                    visiblePage.classList.add('equipment__body-content_active');
                    visiblePage.style.visibility = 'visible';

                    if (visiblePage.classList.contains('complectation') &&
                        !visiblePage.classList.contains('equipment__body-content_no-play')) {

                            document.querySelector('.complectation__video').play();
                            visiblePage.classList.add('equipment__body-content_no-play');

                    }

                }

            }

            e.preventDefault();
    
        });

    }

}
//-------------------------------------------------------------------------------------------

//----- Click scroll ------------------------------------------------------------------------

const scrollLinks = document.querySelectorAll('[data-goto]');

if (scrollLinks.length > 0) {
    for (let scrollLink of scrollLinks) {

        scrollLink.addEventListener("click", function(e) {
            
            const gotoBlock = document.querySelector(scrollLink.dataset.goto);

            if (gotoBlock) {

                let gotoBlockValue;
                gotoBlockValue = gotoBlock.getBoundingClientRect().top + 
                                     pageYOffset - document.querySelector('.header__wrapper').offsetHeight - 20;

                const equipmentVideo = document.querySelector('.complectation');
        
                if (equipmentVideo) {

                    if (!gotoBlock.classList.contains('equipment')) {

                        equipmentVideo.classList.add('equipment__body-content_locked');

                    } else {

                        if (!equipmentVideo.classList.contains('equipment__body-content_active')) {

                            equipmentVideo.classList.add('equipment__body-content_locked');

                        }

                    }

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
}
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
