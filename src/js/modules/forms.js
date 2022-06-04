export default class Forms{
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Loading...',
            success: 'Thanks! Soon we will response',
            failure: 'Something is wrong'
        };
        this.path = 'assets/question.php';
    }
    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await res.text();
    } 
    checkCyrillic () {
        const inputs = document.querySelectorAll('[type="email"]');
        inputs.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if(e.key.match(/[^a-z 0-9 @\.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask() {
            let setCursorPosition = (pos, elem) => {
                elem.focus();
        
                if(elem.setSelectionRange) {
                    elem.setSelectionRange(pos, pos);
                } else if (elem.createTextRange) {
                    let range = elem.createTextRange();
        
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            };
            
            function createMask(event) {
                let matrix = '+1 (___) ___-____';
                let i = 0;
                let def = matrix.replace(/\D/g, '');
                let val = this.value.replace(/\D/g, '');
                console.log(this);
                if(def.length >= val.length) {
                    val = def;
                }
                this.value = matrix.replace(/./g, function(a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) :  i >= val.length ? '' : a;
                });
        
                if(event.type === 'blue') {
                    if(this.value.length == 2) {
                        this.value = '';
                    } 
                    else {
                        setCursorPosition(this.value.length, this);
                    }
                }
            }
            let inputs = document.querySelectorAll('[name="phone"]');
            inputs.forEach(item => {
                item.addEventListener('input', createMask);
                item.addEventListener('focus', createMask);
                item.addEventListener('blur', createMask);
            }); 
    }
    init() {
        this.forms.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let statusMessage = document.createElement('div');
                console.log(item.nextSiblingElement);
                    console.log(item.children[item.children.length - 1]);
                    console.log('fds');
                    statusMessage.classList.add('statusMessage');
                    statusMessage.style.cssText = 'margin-top: 15px; font-size: 18px; color: #A5F';
                    item.parentNode.appendChild(statusMessage);
    
                    statusMessage.textContent = this.message.loading;
                
                const formData = new FormData(item);
                this.postData(this.path, formData).
                then(res => {
                    console.log(res);
                    statusMessage.textContent = this.message.success;
                }).catch(() => {
                    statusMessage.textContent = this.message.failure;
                }).finally(() => {
                    item.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
            });
        });
        this.checkCyrillic();
        this.initMask();
    }
}