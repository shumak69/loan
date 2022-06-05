import MainSlider from "./modules/slider//slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from './modules/playvideo';
import Difference from './modules/difference';
import Forms from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    new MainSlider({container: '.page',btns: '.next'}).render();
    new MainSlider({
        container: '.moduleapp',
        btns: '.next'
    }).render();
    new MiniSlider({
        container: '.showup__content-slider', 
        next: '.showup__next', 
        prev: '.showup__prev',
        activeClass: 'card-active',
        animate: true
    }).init();
    new MiniSlider({
        container: '.modules__content-slider',
        next: '.modules__info-btns .slick-next',
        prev: '.modules__info-btns .slick-prev',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    }).init();
    new MiniSlider({
        container: '.feed__slider',
        next: '.feed__slider .slick-next',
        prev: '.feed__slider .slick-prev',
        activeClass: 'feed__item-active'
    }).init();
    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();
    new Difference('.officerold', '.officernew', '.officer__card-item').init();
    new Forms('form').init();
    new ShowInfo('.module__info-show .plus', '.msg').init();
    new Download('.download').init();
});