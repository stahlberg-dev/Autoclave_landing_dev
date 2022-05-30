import Swiper, { Autoplay, EffectFade, Navigation, Pagination, Thumbs, Mousewheel} from 'swiper';
//import baguetteBox from 'baguettebox.js';

// ----- About slider ------------------------------------------------------------------------

export function swiperAboutSlider() {
    if (document.querySelector('.about__slider')) {
        const aboutSlider = new Swiper('.about__slider', {
            modules: [Navigation, Pagination],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            watchOverflow: true,
            speed: 800,
            loop: true,
            preloadImages: false,
            grabCursor: true,
            pagination: {
                el: '.about__slider-pagination',
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return '<span class="slider-nav__pagination-current">0<span class="' + 
                           currentClass +
                           '"></span></span>' + `/` +
                           `0<span class="` + totalClass + '"></span>';
                },
            },
            navigation: {
            nextEl: '.about__slider-next-button',
            prevEl: '.about__slider-prev-button',
            },
            breakpoints: {
            
            }
        });
    }
}
//------------------------------------------------------------------------------------------- 

// ----- Autoclave-18 sliders ---------------------------------------------------------------

export function autoclaveSliders_18() {

    const thumbsSlider = document.querySelector('.autoclave__gallery-18 .thumbs-slider');
    const mainSlider = document.querySelector('.autoclave__gallery-18 .main-slider');
    const prevButton = document.querySelector('.autoclave__gallery-18 .slider-nav__prev-button');
    const nextButton = document.querySelector('.autoclave__gallery-18 .slider-nav__next-button');
    const paginationContainer = document.querySelector('.autoclave__gallery-18 .slider-nav__pagination');

    if (thumbsSlider && mainSlider) {

        const autoclaveSliderThumbs = new Swiper(thumbsSlider, {
            modules: [Navigation, Pagination, Thumbs, Mousewheel],
            observer: true,
            observeParents: true,
            preloadImages: false,
            direction: 'vertical', 
	        slidesPerView: 4.1, 
	        spaceBetween: 25, 
            mousewheel: {
                sensitivity: 1,
            },
            speed: 400,
            loop: true,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            breakpoints: {
            
            }
        });
    
        const autoclaveSliderMain = new Swiper(mainSlider, {
            modules: [Navigation, Pagination, Thumbs],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 10,
            watchOverflow: true,
            speed: 800,
            loop: true,
            preloadImages: false,
            grabCursor: true,
            thumbs: { 
                swiper: autoclaveSliderThumbs,
            },
            pagination: {
                el: paginationContainer,
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return '<span class="slider-nav__pagination-current"><span class="' + 
                           currentClass +
                           '"></span></span>' + `/ ` +
                           `<span class="` + totalClass + '"></span>';
                },
            },
            navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
            },
            breakpoints: {
            
            }
        });

        const mediaQueryHover = window.matchMedia('(any-hover: hover)');

        if (mediaQueryHover.matches) {

            let thumbs =  thumbsSlider.querySelectorAll('.swiper-slide');
            thumbs.forEach(el => el.addEventListener('mouseenter', function() {
                let index = +el.dataset.swiperSlideIndex + 1;
                autoclaveSliderMain.slideTo(index); 
            }));

        }
    }
}
//------------------------------------------------------------------------------------------- 

// ----- Autoclave-26 sliders ---------------------------------------------------------------

export function autoclaveSliders_26() {

    const thumbsSlider = document.querySelector('.autoclave__gallery-26 .thumbs-slider');
    const mainSlider = document.querySelector('.autoclave__gallery-26 .main-slider');
    const prevButton = document.querySelector('.autoclave__gallery-26 .slider-nav__prev-button');
    const nextButton = document.querySelector('.autoclave__gallery-26 .slider-nav__next-button');
    const paginationContainer = document.querySelector('.autoclave__gallery-26 .slider-nav__pagination');

    if (thumbsSlider && mainSlider) {

        const autoclaveSliderThumbs = new Swiper(thumbsSlider, {
            modules: [Navigation, Pagination, Thumbs, Mousewheel],
            observer: true,
            observeParents: true,
            preloadImages: false,
            direction: 'vertical', 
	        slidesPerView: 4.1, 
	        spaceBetween: 25, 
            mousewheel: {
                sensitivity: 1,
            },
            speed: 400,
            loop: true,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            breakpoints: {
            
            }
        });
    
        const autoclaveSliderMain = new Swiper(mainSlider, {
            modules: [Navigation, Pagination, Thumbs],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 10,
            watchOverflow: true,
            speed: 800,
            loop: true,
            preloadImages: false,
            grabCursor: true,
            thumbs: { 
                swiper: autoclaveSliderThumbs,
            },
            pagination: {
                el: paginationContainer,
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return '<span class="slider-nav__pagination-current"><span class="' + 
                           currentClass +
                           '"></span></span>' + `/ ` +
                           `<span class="` + totalClass + '"></span>';
                },
            },
            navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
            },
            breakpoints: {
            
            }
        });

        const mediaQueryHover = window.matchMedia('(any-hover: hover)');

        if (mediaQueryHover.matches) {

            let thumbs =  thumbsSlider.querySelectorAll('.swiper-slide');
            thumbs.forEach(el => el.addEventListener('mouseenter', function() {
                let index = +el.dataset.swiperSlideIndex + 1;
                autoclaveSliderMain.slideTo(index); 
            }));

        }
    }
}
//------------------------------------------------------------------------------------------- 

// ----- Autoclave-35 sliders ---------------------------------------------------------------

export function autoclaveSliders_35() {

    const thumbsSlider = document.querySelector('.autoclave__gallery-35 .thumbs-slider');
    const mainSlider = document.querySelector('.autoclave__gallery-35 .main-slider');
    const prevButton = document.querySelector('.autoclave__gallery-35 .slider-nav__prev-button');
    const nextButton = document.querySelector('.autoclave__gallery-35 .slider-nav__next-button');
    const paginationContainer = document.querySelector('.autoclave__gallery-35 .slider-nav__pagination');

    if (thumbsSlider && mainSlider) {

        const autoclaveSliderThumbs = new Swiper(thumbsSlider, {
            modules: [Navigation, Pagination, Thumbs, Mousewheel],
            observer: true,
            observeParents: true,
            preloadImages: false,
            direction: 'vertical', 
	        slidesPerView: 4.1, 
	        spaceBetween: 25, 
            mousewheel: {
                sensitivity: 1,
            },
            speed: 400,
            loop: true,
            navigation: {
                nextEl: nextButton,
                prevEl: prevButton,
            },
            breakpoints: {
            
            }
        });
    
        const autoclaveSliderMain = new Swiper(mainSlider, {
            modules: [Navigation, Pagination, Thumbs],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 10,
            watchOverflow: true,
            speed: 800,
            loop: true,
            preloadImages: false,
            grabCursor: true,
            thumbs: { 
                swiper: autoclaveSliderThumbs,
            },
            pagination: {
                el: paginationContainer,
                type: 'fraction',
                renderFraction: function(currentClass, totalClass) {
                    return '<span class="slider-nav__pagination-current"><span class="' + 
                           currentClass +
                           '"></span></span>' + `/ ` +
                           `<span class="` + totalClass + '"></span>';
                },
            },
            navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
            },
            breakpoints: {
            
            }
        });

        const mediaQueryHover = window.matchMedia('(any-hover: hover)');

        if (mediaQueryHover.matches) {

            let thumbs =  thumbsSlider.querySelectorAll('.swiper-slide');
            thumbs.forEach(el => el.addEventListener('mouseenter', function() {
                let index = +el.dataset.swiperSlideIndex + 1;
                autoclaveSliderMain.slideTo(index); 
            }));

        }
    }
}
//------------------------------------------------------------------------------------------- 