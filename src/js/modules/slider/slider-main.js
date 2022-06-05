import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }
    showSlides() {
        this.man = document.querySelector('.hanson');
        if(this.slideIndex > this.slides.length - 1) {
            this.slideIndex = 0;
        }
        if(this.slideIndex < 0) {
            this.slideIndex = this.slides.length - 1;
        }
        this.slides.forEach(item => {
            item.style.display = 'none';
        });
        if(this.man) {
            if(this.slideIndex != 2) {
                this.man.style.display = 'none';
                this.man.classList.remove('animate__animated', 'animate__zoomIn');
            } else {
                setTimeout(() => {
                    this.man.style.display = 'block';
                    this.man.classList.add('animate__animated', 'animate__zoomIn');
                }, 3000);
            }
        }
        this.slides[this.slideIndex].style.display = 'block';
        
    }
    bindTriggers() {
        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.slideIndex--;
                console.log(this.slideIndex, this.slideIndex.length);
                this.showSlides();
            });
        });
        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.slideIndex++;
                this.showSlides();
            });
        });
    }

    render() {
        if(this.container){
            this.btns.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex++;
                    this.showSlides();
                });
                item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.slideIndex = 0;
                    this.showSlides();
                });
            });
            this.showSlides();
            this.bindTriggers();
        }
    }
}