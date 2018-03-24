export default class Question {
    constructor() {
        this.modal = document.querySelector('.js-question');
    }

    init() {
        if(!this.modal) return;

        this.btn = document.querySelector('.js-question-btn');
        this.close = this.modal.querySelector('.js-close');

        this.btn.addEventListener('click', () => this.openForm());
        this.close.addEventListener('click', () => this.closeModal());
    }

    openForm() {
        $(this.modal).fadeIn();
    }

    closeModal() {
        $(this.modal).fadeOut();
    }
}