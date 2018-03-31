export default class Modal {
    constructor() {
        this.btns = document.querySelectorAll('.js-modal-btn');
    }

    init() {
        if(!this.btns.length) return;

        this.modalBg = document.querySelector('.js-modal-bg');
        this.modal = document.querySelector('.js-modal');
        this.close = this.modal.querySelector('.js-close');

        [].forEach.call(this.btns, (btn) => this.initModal(btn));

        this.close.addEventListener('click', () => this.closeModal());
    }

    initModal(btn) {
        btn.addEventListener('click', () => this.openForm(btn));
    }

    openForm(btn) {
        let name = btn.dataset.modal;
        let template = document.querySelector(`[data-modal-template='${name}']`).cloneNode(true);
        let isSynamic = template.hasAttribute('data-modal-dynamic');
        let oldContainer = this.modal.querySelector('.js-modal-container');
        template.removeAttribute('style');
        template.classList.add('js-modal-container');

        if(isSynamic) this.fillTemplate(btn, template);

        if(oldContainer) this.removeContent();

        this.modal.appendChild(template);

        $(this.modalBg).fadeIn(400);
    }

    fillTemplate(btn, template) {
        let btnContainer = $(btn).closest('.js-modal-btn-container')[0];
        let inputs = btnContainer.querySelectorAll('[data-modal-input]');
        [].forEach.call(inputs, (input) => {
            let inputKey = input.dataset.modalInput;
            let templateEl = template.querySelector(`[data-modal-output='${inputKey}']`);
            if(inputKey === 'bgi') {
                templateEl.src = input.style.backgroundImage.replace('url(','').replace(')','').replace(/\"/gi, "");
            } else {
                let _html = input.innerHTML;
                if(inputKey === 'name')  _html = _html.replace('<br>', ' ');
                templateEl.innerHTML = _html;
            }
        });
    }

    closeModal() {
        $(this.modalBg).fadeOut(400, () => this.removeContent());
    }

    removeContent() {
        let container = this.modal.querySelector('.js-modal-container');
        this.modal.removeChild(container);
    }
}