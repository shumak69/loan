export default class VideoPlayer {
    constructor(btns, overlay) {
        this.btns = document.querySelectorAll(btns);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }
    bindTriggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', () => {
                this.overlay.style.display = 'flex';
                this.createPlayer(item.getAttribute('data-url'));
            });
        });
    }
    bindClose() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }
    createPlayer(url) {
        if(!this.player) {
            this.player = new YT.Player('frame', {
                height: '100%',
                width: '100%',
                videoId: url
              });
        }
        
    }
    init() {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.bindTriggers();
        this.bindClose();
    }
}