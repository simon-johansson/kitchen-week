
import $ from 'jquery';
import {random} from 'lodash';

const $body = $('body');
let counter = random(0, 2);

const brad = () => {
  const numberOfBrads = 1;

  for (let ii = numberOfBrads; ii >= 1; ii--) {
    // const size = `${random(500, 550)}px`;
    const size = '700px';
    const el = $('<div/>')
      .addClass('brad')
      .css({
        // 'left': `${random(0, 50)}%`,
        'left': '15%',
        'width': size,
        'height': size,
        'margin-left': `-${size / 2}px`,
        // 'top': `-${size}px`,
        // '-webkit-transition-duration': `${random(15, 20)}s`,
        '-webkit-transition-duration': '20s',
        // '-webkit-transition-delay': `${random(0.0, 4.0)}s`,
      });
    $body.prepend(el);
  };

  setTimeout(() => $('.brad').addClass('drop'), 10);
  setTimeout(() => $('.brad').remove(), 22000);
};

const walking = () => {
  const el = $('<div/>').addClass('walking');
  $body.prepend(el);

  setTimeout(() => $('.walking').addClass('walk'), 10);
  setTimeout(() => $('.walking').remove(), 15000);
};

const thanks = () => {
  const el = $('<div/>').addClass('thanks');
  $body.prepend(el);

  setTimeout(() => $('.thanks').addClass('grow'), 10);
  setTimeout(() => $('.thanks').removeClass('grow'), 5000);
  setTimeout(() => $('.thanks').remove(), 10000);
};

export const randomFeedbackAnimation = () => {
  const animations = [brad, walking, thanks];
  animations[counter]();
  counter = counter >= (animations.length - 1) ? 0 : counter + 1;
};
