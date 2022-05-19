import Swiper, { Navigation, Pagination, Parallax} from 'swiper';
import baguetteBox from 'baguettebox.js';

// ----- Main slider ------------------------------------------------------------------------

export function swiperMainSlider() {
    if (document.querySelector('.slider-main__body')) {
        const mainSlider = new Swiper('.slider-main__body', {
            modules: [Navigation, Pagination, Parallax],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 32,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,
            pagination: {
                el: '.controls-m-s__dots',
                clickable: true,
            },
            navigation: {
            nextEl: '.slider-main .slider-arrows__btn_next',
            prevEl: '.slider-main .slider-arrows__btn_prev',
            },
        });
    }
}
//------------------------------------------------------------------------------------------- 

// ----- Rooms slider -----------------------------------------------------------------------

export function swiperRoomsSlider() {
    if (document.querySelector('.slider-rooms__body')) {
        const roomsSlider = new Swiper('.slider-rooms__body', {
            modules: [Navigation, Pagination, Parallax],
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            spaceBetween: 24,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,
            pagination: {
                el: '.slider-rooms__dots',
                clickable: true,
            },
            navigation: {
            nextEl: '.slider-rooms__arrows .slider-arrows__btn_next',
            prevEl: '.slider-rooms__arrows .slider-arrows__btn_prev',
            },
        });
    }
}
//------------------------------------------------------------------------------------------- 

// ----- Tips slider ------------------------------------------------------------------------

export function swiperTipsSlider() {
    if (document.querySelector('.slider-tips__body')) {
        const tipsSlider = new Swiper('.slider-tips__body', {
            modules: [Navigation, Pagination],
            observer: true,
            observeParents: true,
            slidesPerView: 1.1,
            spaceBetween: 15,
            watchOverflow: true,
            speed: 800,
            loop: true,
            preloadImages: false,
            pagination: {
                el: '.slider-tips__dots',
                clickable: true,
            },
            navigation: {
            nextEl: '.slider-tips__arrows .slider-arrows__btn_next',
            prevEl: '.slider-tips__arrows .slider-arrows__btn_prev',
            },
            breakpoints: {
                768.02: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                992.02: {
                  slidesPerView: 3,
                  spaceBetween: 32
                }
            }
        });
    }
}
//------------------------------------------------------------------------------------------- 

// ----- baguetteBox gallery ------------------------------------------------------------------

export function baguetteBoxGallery() {
    if (document.querySelector('.furniture__items')) {
        baguetteBox.run('.furniture__items', {
            animation: 'slideIn',
        });
    }
}
//------------------------------------------------------------------------------------------- 