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

//----- Equipment pages switcher ------------------------------------------------------------

flsFunctions.equipmentPagesSwitcher();

//-------------------------------------------------------------------------------------------

//----- Liter tabs switcher -----------------------------------------------------------------

flsFunctions.literTabsSwitcher();

//-------------------------------------------------------------------------------------------

//----- Click scroll ------------------------------------------------------------------------

const linkAttributename = 'data-goto';

clickScrollModule.clickScroll(linkAttributename, 
                              clickScrollModule.sectionLock('about'), 
                              clickScrollModule.equipmentVideoLock);

//-------------------------------------------------------------------------------------------

//----- Spoilers ----------------------------------------------------------------------------

const spoilerClassName = 'spoiler';
const spoilerBlockClassName = 'spoiler-block';
const hideTime = 300;

spoilersModule.spoilers(spoilerClassName, spoilerBlockClassName, hideTime);
//-------------------------------------------------------------------------------------------

//----- Auto scroll -------------------------------------------------------------------------

flsFunctions.scrollAuto();

//-------------------------------------------------------------------------------------------

//----- Start animation ------------------------------------------------------------

flsFunctions.startComplectationAnimation();

//-------------------------------------------------------------------------------------------