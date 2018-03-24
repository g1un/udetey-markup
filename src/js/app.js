import './../index.pug';
import './../pages/main.pug';

import './../scss/style.scss';

import Sandwich from './components/sandwich';
import Accordion from './components/accordion';

new Sandwich('.js-sandwich', '.js-sandwich-menu').init();

new Accordion().init();