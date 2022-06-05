export default class Download {
    constructor(btns) {
        this.btns = document.querySelectorAll(btns);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadItem(path) {
        const element = document.createElement('a');
        element.setAttribute('href', path);
        element.setAttribute('download', 'nice_picture');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    init() {
        this.btns.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadItem(this.path);
            });
        });
    }
}