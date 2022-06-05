export default class ShowInfo {
    constructor(btn, message) {
        this.plus = document.querySelectorAll(btn);
        this.message = document.querySelectorAll(message);
    }
    init() {
        this.plus.forEach((item, i) => {
            item.addEventListener('click', () => {
                if(this.message[i].style.display === 'block') {
                    this.message[i].style.display = 'none';
                    this.message[i].classList.remove('animate__animated', 'animate__slideInUp');
                } else {
                    if(this.message[i].textContent.length > 220) {
                        this.message[i].textContent = this.message[i].textContent.slice(0, 220);
                    }
                    this.message[i].style.display = 'block';
                    this.message[i].classList.add('animate__animated', 'animate__slideInUp');
                }
            });
        });
    }
}