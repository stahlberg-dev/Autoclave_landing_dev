import * as flsFunctions from "./modules/functions.js";
import * as sliders from "./modules/sliders.js";
import * as forms from "./modules/forms.js";
import * as headerScrollModule from "./modules/header_scroll.js";
import * as burgerModule from "./modules/burger.js";
import * as popups from "./modules/popups.js";
import * as spoilersModule from "./modules/spoilers.js";
import * as masks from "./modules/masks.js";
import * as clickScrollModule from "./modules/click_scroll.js";


//----- Webp --------------------------------------------------------------------------------

flsFunctions.isWebp();
//-------------------------------------------------------------------------------------------

// ----- About slider -----------------------------------------------------------------------

sliders.swiperAboutSlider();
//------------------------------------------------------------------------------------------- 

// ----- Autoclave-18 sliders ---------------------------------------------------------------

sliders.autoclaveSliders_14();
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
  
const burgerButtonClassName = 'burger';
const burgerMenuClassName = 'menu__body';
const burgerMenuLinksClassName = 'menu__link';
const lockPaddingElementsClassName = 'lock-padding';
const showHideTime = 300;

burgerModule.burger(burgerButtonClassName, 
                    burgerMenuClassName, 
                    burgerMenuLinksClassName, 
                    lockPaddingElementsClassName,
                    showHideTime);
//-------------------------------------------------------------------------------------------

// ----- Popups -----------------------------------------------------------------------------

const popupLinksClassName = 'popup-link';
const popupsClassName = 'popup';
const popupCloseButtonsClassName = 'close-popup';
const timeout = 300;

popups.popupsLauncher(popupLinksClassName, 
                      popupsClassName, 
                      popupCloseButtonsClassName, 
                      lockPaddingElementsClassName, 
                      timeout);
//-------------------------------------------------------------------------------------------

// ----- Phone mask -------------------------------------------------------------------------

const phoneInputsClassName = 'jsPhone';

masks.phoneMask(phoneInputsClassName);
//------------------------------------------------------------------------------------------- 

// ----- Promo mask -------------------------------------------------------------------------

//const promoInputs = document.querySelectorAll('.jsPromoCodeInput');

//masks.promoMask(promoInputs);
//------------------------------------------------------------------------------------------- 

//----- Equipment pages ---------------------------------------------------------------------

const equipmentHeader = document.querySelector('.equipment__header');
const equipmentBody = document.querySelector('.equipment__body');
const startEquipmentTitle = document.querySelector('.equipment__header-content_active');
const startEquipmentBodyContent = document.querySelector('.equipment__body-content_active');

if (equipmentHeader && startEquipmentTitle) {

    const startTitleHeight = startEquipmentTitle.offsetHeight + 'px';
    equipmentHeader.style.height = startTitleHeight;
    startEquipmentTitle.style.visibility = 'visible';
}

if ( equipmentBody && startEquipmentBodyContent) {

    const startEquipmentBodyHeight = startEquipmentBodyContent.offsetHeight + 'px';
    equipmentBody.style.height = startEquipmentBodyHeight;
    startEquipmentBodyContent.style.visibility = 'visible';
}

window.addEventListener('resize', function() {

    const activeEquipmentTitle = document.querySelector('.equipment__header-content_active');
    const activeEquipmentBodyContent = document.querySelector('.equipment__body-content_active');
    
    if (equipmentHeader && activeEquipmentTitle) {

        const activeEquipmentTitleHeight = activeEquipmentTitle.offsetHeight + 'px';
        equipmentHeader.style.height = activeEquipmentTitleHeight;

    }

    if (equipmentBody && activeEquipmentBodyContent) {

        const activeEquipmentBodyHeight = activeEquipmentBodyContent.offsetHeight + 'px';
        equipmentBody.style.height = activeEquipmentBodyHeight;

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

                    equipmentHeader.style.height = titleHeight;
                    equipmentBody.style.height = pageContentHeight;

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

const linkAttributename = 'data-goto';

clickScrollModule.clickScroll(linkAttributename, 
                              clickScrollModule.sectionLock('about'), 
                              clickScrollModule.equipmentVideoLock);

//-------------------------------------------------------------------------------------------

//----- Liter tabs --------------------------------------------------------------------------

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

const equipmentSection = document.querySelector('.equipment');
const aboutSection = document.querySelector('.about');
const equipmentVideo = document.querySelector('.complectation');
const headerWrapper = document.querySelector('.header__wrapper');

document.addEventListener("scroll", function(e) {

    const windowHeight = document.documentElement.clientHeight;
    
    if (equipmentSection) {

        const equipmentScrollSpace =  windowHeight - equipmentSection.getBoundingClientRect().top;

        if ((equipmentScrollSpace > 0) && 
            (equipmentScrollSpace < equipmentSection.offsetHeight + windowHeight) ) {

            if (equipmentVideo) {

                if (equipmentVideo.classList.contains('equipment__body-content_active') && 
                    !equipmentVideo.classList.contains('equipment__body-content_no-play') &&
                    !equipmentVideo.classList.contains('equipment__body-content_locked')) {
                    
                    const gotoVideoValue = equipmentVideo.getBoundingClientRect().top + 
                                            pageYOffset - headerWrapper.offsetHeight;

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

    if (aboutSection) {

        const aboutScrollSpace =  windowHeight - aboutSection.getBoundingClientRect().top;

        if ((aboutScrollSpace > 0) && 
            (aboutScrollSpace < aboutSection.offsetHeight + windowHeight) ) {

            if (!aboutSection.classList.contains('about_shown') &&
                !aboutSection.classList.contains('about_locked')) {

                const gotoAboutSectionValue = aboutSection.getBoundingClientRect().top + 
                                                pageYOffset - headerWrapper.offsetHeight - 20;

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
