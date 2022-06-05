export default class Difference {
    constructor(oldEdu, newEdu, items) {
        this.oldEdu = document.querySelector(oldEdu);
        this.newEdu = document.querySelector(newEdu);
        try{
            this.oldItems = this.oldEdu.querySelectorAll(items);
            this.newItems = this.newEdu.querySelectorAll(items);
        } catch(e){}
        
        this.oldCounter = 0;
        this.newCounter = 0;
    }

    bindBtns(edu, items, counter) {
        edu.querySelector('.plus').addEventListener('click', () => {
            if(counter == items.length - 2) {
                items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            } else {
                items[counter].style.display = 'flex';
                counter++;
            }
        });
    }

    hideItems(items) {
        items.forEach((item, i, arr) =>{
            if(i !== arr.length - 1) {
                item.style.display = 'none';
            }
        });
    }
    init() {
        try{
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindBtns(this.oldEdu, this.oldItems, this.oldCounter);
            this.bindBtns(this.newEdu, this.newItems, this.newCounter);
        } catch(e){}
    }
}