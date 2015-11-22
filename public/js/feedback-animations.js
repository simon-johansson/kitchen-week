
import $ from 'jquery';
import {random} from 'lodash';

const $body = $('body');

export const brad = () => {
  const numberOfBrads = 12;

  for (let ii = numberOfBrads; ii >= 0; ii--) {
    const size = `${random(130, 450)}px`;
    const el = $('<div/>')
      .addClass('brad')
      .css({
        'left': `${random(0, 80)}%`,
        'width': size,
        'height': size,
        'margin-left': `-${size / 2}px`,
        // 'top': `-${size}px`,
        '-webkit-transition-duration': `${random(8, 15)}s`,
        '-webkit-transition-delay': `${random(0.0, 4.0)}s`,
      });
    $body.prepend(el);
  };

  setTimeout(() => $('.brad').addClass('drop'), 100);
  setTimeout(() => $('.brad').remove(), 20000);
};

export const walking = () => {
  const el = $('<div/>').addClass('walking');
  $body.prepend(el);

  setTimeout(() => $('.walking').addClass('walk'), 100);
  setTimeout(() => $('.walking').remove(), 15000);
};

export const thanks = () => {

  const el = $('<div/>').addClass('thanks');
  $body.prepend(el);

  setTimeout(() => $('.thanks').addClass('grow'), <10> </10>0);
  setTimeout(() => $('.thanks').removeClass('grow'), 5000);
  setTimeout(() => $('.thanks').remove(), 10000);
};

