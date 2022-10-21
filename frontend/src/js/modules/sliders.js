import Swiper, { Autoplay, Navigation, Pagination, Thumbs, Mousewheel, Scrollbar} from 'swiper';

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
                    return '<span class="' + currentClass + '"></span>' + 
                           '<span>/</span>' +
                           '<span class="' + totalClass + '"></span>';
                },
            },
            navigation: {
            nextEl: '.about__slider-next-button',
            prevEl: '.about__slider-prev-button',
            },
            breakpoints: {
            
            }
        });

        aboutSlider.on('slideChange', function () {
            
            let activeAboutSlide = document.querySelector('.about__slider .swiper-slide-active');

            if (activeAboutSlide.classList.contains('first-slide')) {
                let selectedSlides = document.querySelectorAll('.first-slide');

                if (selectedSlides.length > 0) {
                    for (let selectedSlide of selectedSlides) {
                        selectedSlide.classList.add('no-animation');
                    }
                }
            } else if (activeAboutSlide.classList.contains('second-slide')) {
                let selectedSlides = document.querySelectorAll('.second-slide');

                if (selectedSlides.length > 0) {
                    for (let selectedSlide of selectedSlides) {
                        selectedSlide.classList.add('no-animation');
                    }
                }
            } else if (activeAboutSlide.classList.contains('third-slide')) {
                let selectedSlides = document.querySelectorAll('.third-slide');

                if (selectedSlides.length > 0) {
                    for (let selectedSlide of selectedSlides) {
                        selectedSlide.classList.add('no-animation');
                    }
                }
            } else if (activeAboutSlide.classList.contains('fourth-slide')) {
                let selectedSlides = document.querySelectorAll('.fourth-slide');

                if (selectedSlides.length > 0) {
                    for (let selectedSlide of selectedSlides) {
                        selectedSlide.classList.add('no-animation');
                    }
                }               
            } else {
                activeAboutSlide.classList.add('no-animation');
            }

        });

    }
}
//------------------------------------------------------------------------------------------- 

// ----- Autoclave-14 sliders ---------------------------------------------------------------

export function autoclaveSliders_14() {

    const thumbsSlider = document.querySelector('.autoclave__gallery-14 .thumbs-slider');
    const mainSlider = document.querySelector('.autoclave__gallery-14 .main-slider');
    const prevButton = document.querySelector('.autoclave__gallery-14 .slider-nav__prev-button');
    const nextButton = document.querySelector('.autoclave__gallery-14 .slider-nav__next-button');
    const paginationContainer = document.querySelector('.autoclave__gallery-14 .slider-nav__pagination');

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
                    return '<span class="' + currentClass + '"></span>' + 
                           '<span>/</span>' +
                           '<span class="' + totalClass + '"></span>';
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
                    return '<span class="' + currentClass + '"></span>' + 
                           '<span>/</span>' +
                           '<span class="' + totalClass + '"></span>';
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
                    return '<span class="' + currentClass + '"></span>' + 
                           '<span>/</span>' +
                           '<span class="' + totalClass + '"></span>';
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
                    return '<span class="' + currentClass + '"></span>' + 
                           '<span>/</span>' +
                           '<span class="' + totalClass + '"></span>';
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

// ----- Work slider ------------------------------------------------------------------------

export function workSlider() {
    if (document.querySelector('.work__slider')) {
        const workSlider = new Swiper('.work__slider', {
            modules: [Navigation, Pagination, Scrollbar],
            observer: true,
            observeParents: true,
            slidesPerView: 1.2,
            spaceBetween: 10,
            watchOverflow: true,
            speed: 800,
            //loop: true,
            preloadImages: false,
            grabCursor: true,
            scrollbar: {
                el: '.work__slider-scrollbar',
                draggable: true,
            },
            breakpoints: {
                481: { 
                    slidesPerView: 2.2,
                },
            }
        });
    }
}
//-------------------------------------------------------------------------------------------

// ----- Comparison slider ------------------------------------------------------------------------

export function comparisonSlider() {
    if (document.querySelector('.comparison__slider')) {
        const comparisonSlider = new Swiper('.comparison__slider', {
            modules: [Navigation, Pagination, Scrollbar],
            observer: true,
            observeParents: true,
            slidesPerView: 1.3,
            spaceBetween: 10,
            watchOverflow: true,
            speed: 800,
            //loop: true,
            preloadImages: false,
            grabCursor: true,
            scrollbar: {
                el: '.comparison__slider-scrollbar',
                draggable: true,
            },
            breakpoints: {
                481: { 
                    slidesPerView: 2.2,
                    spaceBetween: 15,
                },

                769: { 
                    slidesPerView: 3.35,
                    spaceBetween: 15,
                },
            }
        });
    }
}
//------------------------------------------------------------------------------------------- 