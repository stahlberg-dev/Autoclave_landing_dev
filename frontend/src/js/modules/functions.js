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

export function addChristmasDecorations() {

    document.querySelector('.title-screen')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/1.webp" alt="" class="title-screen__branch"></img>');

    document.querySelector('.title-screen')
        ?.insertAdjacentHTML('beforeend',
                             '<img src="img/christmas/4.webp" alt="" class="title-screen__snowflake-big">');
                        
    document.querySelector('.title__pre-title')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/2.webp" alt="" class="title__snowflake-medium">');

    document.querySelector('.title__main-title')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/2.webp" alt="" class="title__snowflake-small">');

    document.querySelector('.title__after-title')
        ?.insertAdjacentHTML('beforeend',
                             '<img src="img/christmas/3.webp" alt="" class="title__star">');

    document.querySelector('.advantage:first-child')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/7.webp" alt="" class="advantage__tree-toy">');

    document.querySelector('.advantage:nth-child(2)')
        ?.insertAdjacentHTML('beforeend',
                             '<img src="img/christmas/5.webp" alt="" class="advantage__branch-left">');

    document.querySelector('.advantage:nth-child(2)')
        ?.insertAdjacentHTML('beforeend',
                             '<img src="img/christmas/6.webp" alt="" class="advantage__branch-right">');

    document.querySelector('.advantage:nth-child(2)')
        ?.insertAdjacentHTML('beforeend',
                             '<img src="img/christmas/3.webp" alt="" class="advantage__star-top">');

    document.querySelector('.advantage:nth-child(2)')
        ?.insertAdjacentHTML('beforeend',
                             '<img src="img/christmas/3.webp" alt="" class="advantage__star-bottom">');

    document.querySelector('.about__container')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/8.webp" alt="" class="about__serpentine">');

    document.querySelector('.about__container')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/2.webp" alt="" class="about__snowflake-medium">');

    document.querySelector('.about__container')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/4.webp" alt="" class="about__snowflake-big">');

    document.querySelector('.perfection')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/4.webp" alt="" class="perfection__snowflake-big">');

    document.querySelector('.perfection')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/4.webp" alt="" class="perfection__snowflake-small">');

    document.querySelector('.perfection')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/9.webp" alt="" class="perfection__branch">');

    document.querySelector('.perfection__block:last-child')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/3.webp" alt="" class="perfection__star">');

    document.querySelector('.promo-discount__content')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/1.webp" alt="" class="promo-discount__branch">');

    document.querySelector('.promo-discount__content')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/8.webp" alt="" class="promo-discount__serpentine">');

    document.querySelector('.autoclave')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/2.webp" alt="" class="autoclave__snowflake-small">');

    document.querySelector('.autoclave__payment')
        ?.insertAdjacentHTML('beforeend',
                             '<img src="img/christmas/4.webp" alt="" class="payment__snowflake-medium">');

    document.querySelector('.benefits__item:nth-child(4)')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/3.webp" alt="" class="benefits__star-left">');

    document.querySelector('.benefits__item:nth-child(6)')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/7.webp" alt="" class="benefits__tree-toy">');

    document.querySelector('.benefits__item:nth-child(6)')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/3.webp" alt="" class="benefits__star-right">');

    document.querySelector('.comparison')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/8.webp" alt="" class="comparison__serpentine">');

    document.querySelector('.comparison')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/4.webp" alt="" class="comparison__snowflake-small">');

    document.querySelector('.comparison')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/2.webp" alt="" class="comparison__snowflake-medium">');

    document.querySelector('.equipment')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/10.webp" alt="" class="equipment__branch">');

    document.querySelector('.equipment')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/2.webp" alt="" class="equipment__snowflake-medium">');

    document.querySelector('.complectation')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/8.webp" alt="" class="complectation__serpentine">');

    document.querySelector('.about-us__container')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/4.webp" alt="" class="about-us__snowflake-big">');

    document.querySelector('.about-us__container')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/8.webp" alt="" class="about-us__serpentine-right">');

    document.querySelector('.about-us__title')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/3.webp" alt="" class="about-us__star">');

    document.querySelector('.about-us__item:nth-child(1)')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/8.webp" alt="" class="about-us__serpentine-left">');

    document.querySelector('.about-us__item:nth-child(6)')
        ?.insertAdjacentHTML('beforeend',
                             '<img src="img/christmas/11.webp" alt="" class="about-us__tree-toy">');

    document.querySelector('footer')
        ?.insertAdjacentHTML('afterbegin',
                             '<img src="img/christmas/12.webp" alt="" class="footer__branch">');

}