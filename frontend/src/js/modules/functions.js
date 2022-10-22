export function isWebp() {
    function testWebP(callback) {
        let webP = new Image(); 
        webP.onload = webP.onerror = function () { 
            callback(webP.height == 2); 
        }; 
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

export function lockBody (lockPaddingElements, disablePointerDelay = 0) {

    if (!document.body.classList.contains('locked')) {

        const lockPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';

        document.body.classList.add('locked');
        document.body.style.paddingRight = lockPaddingValue;

        lockPaddingElements.forEach(item => {
            item.style.paddingRight = lockPaddingValue;
        });

        let scroller = document.createElement('div');
        scroller.className = 'scroller disable-pointer';
        document.body.append(scroller);

        setTimeout(function() {

            scroller.classList.remove('disable-pointer');

        }, disablePointerDelay);

    }

}

export function unlockBody (lockPaddingElements, unlockDelay = 0) {

    if (document.body.classList.contains('locked')) {

        const scroller = document.querySelector('.scroller');
        scroller?.classList.add('disable-pointer');

        setTimeout(function() {
            
            document.body.classList.remove('locked');
            document.body.style.paddingRight = '0px';

            lockPaddingElements.forEach(item => {
                item.style.paddingRight = '0px';
            });
            
            scroller?.remove();
    
        }, unlockDelay);

    } 

}

export function literTabsSwitcher() {

    const changeSliderTime = 300;
    const changePageTime = 300;
    const literTabButtons = document.querySelectorAll('[data-code]');
    const equipmentBody = document.querySelector('.equipment__body');
    const characteristicsHeader = document.querySelector('.characteristics-header');
    let unlockTab = true;

    if (document.querySelector('.slider-gallery_active')) {
        document.querySelector('.slider-gallery_active').style.visibility = 'visible';
    }

    literTabButtons.forEach(item => {

        item.addEventListener("click", () => {

            if (item.classList.contains('liter-buttons__button_active') || !unlockTab) return;
                            
            const activeTabButtons = document.querySelectorAll('.liter-buttons__button_active');
            unlockTab = false;

            activeTabButtons.forEach(element => {

                const activeTabButtonName = element.getAttribute('data-code');
                const activeSlider = document.querySelector(`[data-tab="${activeTabButtonName}"]`);
                const activePage = document.querySelector(`[data-page="${activeTabButtonName}"]`);

                element.classList.remove('liter-buttons__button_active');
                
                if (activeSlider) {
                    
                    activeSlider.classList.remove('slider-gallery_active');

                    setTimeout(() => {
                        activeSlider.style.visibility = '';
                    }, changeSliderTime);

                }

                if (activePage) {
                    
                    activePage.classList.remove('characteristics_tab-active');
                    activePage.classList.remove('equipment__body-content_active');

                    setTimeout(() => {
                        activePage.style.visibility = '';
                    }, changePageTime);

                }

            });

            const literTabButtonName = item.getAttribute('data-code');
            const newActiveTabButtons = document.querySelectorAll(`[data-code="${literTabButtonName}"]:not([data-goto])`);
            const newActiveSlider = document.querySelector(`[data-tab="${literTabButtonName}"]`);
            const newActivePage = document.querySelector(`[data-page="${literTabButtonName}"]`);

            newActiveTabButtons.forEach(element => {
                element.classList.add('liter-buttons__button_active');
            });

            if (newActiveSlider) {
                newActiveSlider.classList.add('slider-gallery_active');
                newActiveSlider.style.visibility = 'visible';
            }

            if (newActivePage) {

                newActivePage.classList.add('characteristics_tab-active');

                if (characteristicsHeader?.classList.contains('equipment__header-content_active')) {

                    const pageContentHeight = newActivePage.offsetHeight + 'px';

                    equipmentBody.style.height = pageContentHeight;
                    newActivePage.classList.add('equipment__body-content_active');
                    newActivePage.style.visibility = 'visible';

                }
            }

            setTimeout(() => {
                unlockTab = true;
            }, Math.max(changeSliderTime, changePageTime));

        });

    });

}

export function equipmentPagesSwitcher() {

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

    const changePageTime = 300;
    const pageButtons = document.querySelectorAll('[data-page-button]');

    pageButtons.forEach(item => {

        item.addEventListener("click", () => {
                        
            const pageButtonName = item.getAttribute('data-page-button');
            const visiblePageHeader = document.querySelector(`.${pageButtonName}-header`);
            let visiblePage;

            if (pageButtonName === 'characteristics') {

                visiblePage = document.querySelector(`.${pageButtonName}.characteristics_tab-active`);

            } else {

                visiblePage = document.querySelector(`.${pageButtonName}`);

            }

            if (!visiblePageHeader || !visiblePage) return;
            if (visiblePageHeader.classList.contains('equipment__header-content_active')) return;

            const hiddenTitle = document.querySelectorAll('.equipment__header-content_active');
            const hiddenPage = document.querySelectorAll('.equipment__body-content_active');

            hiddenTitle.forEach(element => {

                element.classList.remove('equipment__header-content_active');

                setTimeout(() => {
                    element.style.visibility = '';
                }, changePageTime / 2);

            });

            hiddenPage.forEach(element => {

                element.classList.remove('equipment__body-content_active');

                setTimeout(() => {
                    element.style.visibility = '';
                }, changePageTime);

            });

            const titleHeight = visiblePageHeader.offsetHeight + 'px';
            const pageContentHeight = visiblePage.offsetHeight + 'px';

            equipmentHeader.style.height = titleHeight;
            equipmentBody.style.height = pageContentHeight;

            setTimeout(() => {

                visiblePageHeader.classList.add('equipment__header-content_active');
                visiblePageHeader.style.visibility = 'visible';

            }, changePageTime / 2);

            visiblePage.classList.add('equipment__body-content_active');
            visiblePage.style.visibility = 'visible';

            if (visiblePage.classList.contains('complectation') &&
                !visiblePage.classList.contains('equipment__body-content_no-play')) {

                    visiblePage.querySelector('.complectation__video').play();
                    visiblePage.classList.add('equipment__body-content_no-play');

            }

        });

    });

}

export function scrollAuto() {

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

}

export function startComplectationAnimation() {

    const complectationBody = document.querySelector('.complectation');
    const complectationVideo = document.querySelector('.complectation__video');

    complectationVideo?.addEventListener("ended", function() {
            
        complectationBody?.classList.add('complectation_start-animation');

    }, false);

}