import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if(this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        if(this.slides[0].tagName === 'BUTTON' && this.slides[1].tagName !== 'BUTTON') {
            while(this.slides[0].tagName === 'BUTTON') {
                let active =  this.slides[this.slides.length - 1];
                this.container.insertBefore(active, this.slides[0]);
            }
            
        } else {
            while(this.slides[0].tagName === 'BUTTON') {
                this.container.appendChild(this.slides[0]);
            }
        }
        
        this.slides[0].classList.add(this.activeClass);

        if(this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
    }
    bindBtns() {
        this.next.addEventListener('click', () => {
            this.nextSlide();
        });
        this.prev.addEventListener('click', () => {
            let active =  this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
        });
    }
    activateAnimation() {
        const auto = setInterval(() => {
            this.nextSlide();
        }, 5000);
        this.next.addEventListener('mouseenter', () => {
            clearInterval(auto);
        });
        this.next.addEventListener('mouseleave', () => {
            this.activateAnimation();
        });
        this.prev.addEventListener('mouseenter', () => {
            clearInterval(auto);
        });
        this.prev.addEventListener('mouseleave', () => {
            this.activateAnimation();
        });
        this.container.addEventListener('mouseenter', (e) => {
            clearInterval(auto);
        });
        this.container.addEventListener('mouseleave', (e) => {
            this.activateAnimation();
        });
    }
    init() {
        try{
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;    
        `;

        this.bindBtns();
        this.decorizeSlides();
        if(this.autoplay) {
            this.activateAnimation();
        }
        } catch(e){}
    }
}