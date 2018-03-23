import './../index.pug';
import './../pages/main.pug';

import './../scss/style.scss';

import Sandwich from './components/sandwich';

new Sandwich('.js-sandwich', '.js-sandwich-menu').init();