import './../scss/style.scss';

//global jQuery
import 'expose-loader?$!jquery';

import Sandwich from './components/sandwich';
import Accordion from './components/accordion';
import Question from './components/question';
import Anchors from './components/anchors';

//LEGACY
// import './../legacy/js/legacy.js';
//-LEGACY

new Sandwich('.js-sandwich', '.js-sandwich-menu').init();
new Accordion().init();
new Question().init();
new Anchors().init();
