export default class Sandwich {
    constructor(btn, menu) {
        this.btn = document.querySelector(btn);
        this.menu = document.querySelector(menu);
    }

    init() {
        if(!this.btn) return;

        this.btn.addEventListener('click', this.onBtnClick.bind(this));
    }

    onBtnClick() {
        this.menu.classList.toggle('_show');
    }
}