export default class VideoPlayer {
    constructor(btns, overlay) {
        this.btns = document.querySelectorAll(btns);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }
    bindTriggers() {
        this.btns.forEach((item, i) => {
            try{
                const blockedElem = item.closest('.module__video-item').nextElementSibling;
            if(i % 2 == 0) {
                blockedElem.setAttribute('data-disabled', true);
            }
            }catch(e){}
            item.addEventListener('click', () => {
                if(!item.closest('.module__video-item') || item.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = item;
                    if(document.querySelector('iframe#frame')) {
                        if(this.path !== item.getAttribute('data-url')) {
                            this.path = item.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {
                        this.path = item.getAttribute('data-url');
                        this.createPlayer(this.path);
                    }
                    
                    this.overlay.style.display = 'flex';
                }
                
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
                videoId: url,
                events: {
                    'onStateChange': this.onPlayerStateChange
                  }
              });
        }
    }

    onPlayerStateChange(state) {
        try{
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
        const playBtnImg = this.activeBtn.querySelector('svg').cloneNode(true);

        if(state.data === 0) {
            if(blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                blockedElem.querySelector('.play__circle').classList.remove('closed');
                blockedElem.querySelector('svg').remove();
                blockedElem.querySelector('.play__circle').appendChild(playBtnImg);
                blockedElem.querySelector('.play__text').textContent = 'play video';
                blockedElem.querySelector('.play__text').classList.remove('attention');
                blockedElem.style.opacity = 1;
                blockedElem.style.filter = 'none';

                blockedElem.setAttribute('data-disabled', 'false');
            }

        }
        }catch(e){}
    }
    init() {
        if(this.btns.length > 0) {
            const tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            this.bindTriggers();
            this.bindClose();
        }
        
    }
}