import Swiper, { Navigation, Pagination, Parallax} from 'swiper';
import baguetteBox from 'baguettebox.js';

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
