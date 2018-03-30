import Sandwich from './sandwich';

export default class Anchors {
    constructor() {
        this.links = document.querySelectorAll('.js-link');
        this.headerHeight = 65;
        this.$body = $('html, body');
    }

    init() {
        if(this.links.length <= 0) return;

        [].forEach.call(this.links, (link) => this.initLink(link));
    }

    initLink(link) {
        link.addEventListener('click', (e) => this.onLinkClick(e));
    }

    onLinkClick(e) {
        e.preventDefault();
        let linkHref = e.target.getAttribute('href');
        let anchor = document.querySelector(linkHref);
        let pageScroll = window.pageYOffset;
        let anchorTop = anchor.getBoundingClientRect().top;

        this.closeMenu();

        this.$body.animate(
            {scrollTop: anchorTop + pageScroll - this.headerHeight}, 1000
        )
    }

    closeMenu() {
        this.menu = document.querySelector('.js-sandwich-menu');
        this.menu.classList.remove('_show');
    }
}