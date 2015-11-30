
import $ from 'jquery';
import {random} from 'lodash';

const animate = ($el, className) => {
  $el
    .addClass(className)
    .one('webkitTransitionEnd otransitionend oTransitionEnd transitionend',
      function (e) {
        $(this).removeClass(className);
    });
};

const brad = () => animate($('.brad'), 'drop');
const asta = () => animate($('.asta'), 'drop');
const walking = () => animate($('.bean'), 'walking');

const thanks = () => {
  $('.thanks').addClass('grow');
  setTimeout(() => $('.thanks').removeClass('grow'), 7000);
};

const thankyous = () => {
  for (let ii = 0; ii <= 6; ii++) {
    (function () {
      const $el = $(`.cheesy${ii + 1}`);
      setTimeout(() => {
        $el.addClass('show');
      }, random(700, 1000) * ii);
      setTimeout(() => $el.removeClass('show'), 8000);
    })();
  };
};

const animations = [brad, walking, asta, thanks, thankyous];
let counter = random(0, (animations.length - 1));

export const randomFeedbackAnimation = () => {
  animations[counter]();
  counter = counter >= (animations.length - 1) ? 0 : counter + 1;
};
