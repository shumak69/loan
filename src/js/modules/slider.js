export default class Slider {
    constructor (page, btns) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 0;
    }

    showSlides() {
        if(this.slideIndex > this.slides.length - 1) {
            this.slideIndex = 0;
        }
        if(this.slideIndex < 0) {
            this.slideIndex = this.slideIndex.length - 1;
        }
        this.slides.forEach(item => {
            item.style.display = 'none';
        });
        this.slides[this.slideIndex].style.display = 'block';
    }

    render() {
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
    }
}