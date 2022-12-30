import {
    isWebp, 
    literTabsSwitcher, 
    equipmentPagesSwitcher,
    scrollAuto,
    startComplectationAnimation,
} from "./modules/functions.js";
import * as sliders from "./modules/sliders.js";
import * as forms from "./modules/forms.js";
import {scrollObserver} from "./modules/scroll-observer.js";
import {burger} from "./modules/burger.js";
import {popupsMaker} from "./modules/popups-maker.js";
import {spoilers} from "./modules/spoilers.js";
import {phoneMask, promoMask} from "./modules/masks.js";
import {lockEquipmentVideo, clickScroller} from "./modules/click-scroller.js";
import {temporaryElementMaker} from "./modules/temporary-element-maker.js";


//----- Webp --------------------------------------------------------------------------------

isWebp();
//-------------------------------------------------------------------------------------------

//----- setTemporaryElements ----------------------------------------------------------------

new temporaryElementMaker([
    {
        parentElementClassMame: '.thanks-popup__text', 
        startDateString: 'December 31, 2022', 
        endDateString: 'January 3, 2023', 
        elementString: 'Ваша заявка отправлена, с&nbsp;вами свяжется менеджер в&nbsp;рабочее время&nbsp;03.01.23&nbsp;г.',
    },
    {
        parentElementClassMame: '.checkout-popup__text', 
        startDateString: 'December 31, 2022', 
        endDateString: 'January 3, 2023', 
        elementString: 'Ожидайте звонка менеджера в&nbsp;рабочее время&nbsp;03.01.23&nbsp;г.',
    },
    {
        parentElementClassMame: '.thanks-popup__text', 
        startDateString: 'January 7, 2023', 
        endDateString: 'January 8, 2023', 
        elementString: 'Ваша заявка отправлена, с&nbsp;вами свяжется менеджер в&nbsp;рабочее время&nbsp;08.01.23&nbsp;г.',
    },
    {
        parentElementClassMame: '.checkout-popup__text', 
        startDateString: 'January 7 2023', 
        endDateString: 'January 8, 2023', 
        elementString: 'Ожидайте звонка менеджера в&nbsp;рабочее время&nbsp;08.01.23&nbsp;г.',
    },
]).init();

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

//----- Header scroll -----------------------------------------------------------------------

new scrollObserver({
    elementClassName: '.header',
    scrolledClassName: '.header_scroll',
}).init();
//-------------------------------------------------------------------------------------------

// ----- Burger -----------------------------------------------------------------------------
  
new burger({
    buttonClassName: '.burger',
    activeButtonClassName: '.burger_active',
    menuClassName: '.menu__body',
    activeMenuClassName: '.menu__body_active',
    menuLinkClassName: '.menu__link',
    lockPaddingElementClassName: '.lock-padding',
    showHideTime: 300,
}).init();
//-------------------------------------------------------------------------------------------

// ----- Popups -----------------------------------------------------------------------------

popupsMaker.init();
//-------------------------------------------------------------------------------------------

// ----- Forms ------------------------------------------------------------------------------

forms.startForms();
//-------------------------------------------------------------------------------------------

// ----- Phone mask -------------------------------------------------------------------------

const phoneInputsClassName = 'jsPhone';

phoneMask(phoneInputsClassName);
//------------------------------------------------------------------------------------------- 

// ----- Promo mask -------------------------------------------------------------------------

//const promoInputs = document.querySelectorAll('.jsPromoCodeInput');

//masks.promoMask(promoInputs);
//------------------------------------------------------------------------------------------- 

//----- Equipment pages switcher ------------------------------------------------------------

equipmentPagesSwitcher();

//-------------------------------------------------------------------------------------------

//----- Liter tabs switcher -----------------------------------------------------------------

literTabsSwitcher();

//-------------------------------------------------------------------------------------------

//----- Click scroller ----------------------------------------------------------------------

new clickScroller({
    linkAttributeName: 'data-goto',
    lockedSections: [
        {sectionClassName: '.about', unlockDelay: 1000},
    ],
    callbacks: [
        lockEquipmentVideo,
    ]
}).init();
//-------------------------------------------------------------------------------------------

//----- Spoilers ----------------------------------------------------------------------------

new spoilers({
    spoilerClassName: '.spoiler',
    spoilerBlockClassName: '.spoiler-block',
    spoilerActiveBlockClassName: '.spoiler-block_active',
    hideTime: 300,
}).init();
//-------------------------------------------------------------------------------------------

//----- Auto scroll -------------------------------------------------------------------------

scrollAuto();

//-------------------------------------------------------------------------------------------

//----- Start animation ------------------------------------------------------------

startComplectationAnimation();

//-------------------------------------------------------------------------------------------