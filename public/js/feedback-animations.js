
import $ from 'jquery';
import {random} from 'lodash';

const $body = $('body');
let counter = random(0, 2);

const brad = () => {
  $('.brad')
    .addClass('drop')
    .one('webkitTransitionEnd otransitionend oTransitionEnd transitionend',
      function (e) {
        console.log('remove');
        $(this).removeClass('drop');
    });
};

const walking = () => {
  $('.walking')
    .addClass('walk')
    .one('webkitTransitionEnd otransitionend oTransitionEnd transitionend',
      function (e) {
        console.log('remove');
        $(this).removeClass('walk');
    });
};

const thanks = () => {
  $('.thanks').addClass('grow');
  setTimeout(() => $('.thanks').removeClass('grow'), 8000);
};

export const randomFeedbackAnimation = () => {
  const animations = [brad, walking, thanks];
  animations[counter]();
  counter = counter >= (animations.length - 1) ? 0 : counter + 1;
};
