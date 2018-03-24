export default class Accordion {
    constructor() {
        this.accs = document.querySelectorAll('.js-accordion');
    }

    init() {
        if(!this.accs.length) return;

        [].forEach.call(this.accs, (acc) => this.initAcc(acc));
    }

    initAcc(acc, i) {
        let items = acc.querySelectorAll('.js-accordion-item');

        [].forEach.call(items, (item) => this.initAccItems(item, items));
    }

    initAccItems(item, items) {
        let btn = item.querySelector('.js-accordion-btn');
        let content = item.querySelector('.js-accordion-content');

        if(!item.classList.contains('_opened')) content.style.display = 'none';

        btn.addEventListener('click', () => this.toggleAccordion(item, items));
    }

    toggleAccordion(item, items) {
        let currentItem = item;
        let currentContent = currentItem.querySelector('.js-accordion-content');

        if(currentItem.classList.contains('_opened')) {
            currentItem.classList.remove('_opened');
            $(currentContent).slideUp();
        } else {
            [].forEach.call(items, function(_item) {
                _item.classList.remove('_opened');
            });
            [].forEach.call(items, (__item) => {
                $(__item.querySelector('.js-accordion-content')).slideUp();
            });

            item.classList.add('_opened');
            $(currentContent).slideDown();
        }
    }
}