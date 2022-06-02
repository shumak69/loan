import Slider from "./modules/slider";
import playvideo from './modules/playvideo';
window.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider('.page', '.next');
    slider.render();
    new playvideo('.showup .play', '.overlay').init();
});