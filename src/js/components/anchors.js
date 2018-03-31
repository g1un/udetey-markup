export default class Anchors {
    constructor() {
        this.links = document.querySelectorAll('.js-link');
        this.$body = $('html, body');
    }

    init() {
        if(this.links.length <= 0) return;

        this.header = document.querySelector('.js-header');
        if(window.getComputedStyle(this.header).position === 'fixed') {
            this.headerHeight = 65;
        } else {
            this.headerHeight = 0;
        }

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