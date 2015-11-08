
import request from 'superagent';
import $ from 'jquery';
import spinner from './spinner';
// import isOnline from 'is-online';

// isOnline((err, online) => {
//   console.log(online);
// });

class AppView {
  constructor() {
    this.$btns = $('.feedback-button');
    this.$overlays = $('.overlay');
    this.bindClickEvent();
  }

  bindClickEvent() {
    this.$btns.on('click', ::this.onButtonClicked);
  }

  unbindClickEvent() {
    this.$btns.off('click');
  }

  onButtonClicked(ev) {
    const $el = $(ev.currentTarget);
    const endpoint = $el.data('endpoint');
    const $overlay = $el.find('.overlay');

    this.unbindClickEvent();
    this.addSpinner($overlay);
    this.giveFeedback(endpoint);
  }

  onRequestDone() {
    this.removeSpinner();
    this.bindClickEvent();
    // Show "ok" symbol
  }

  onRequestFailed(err) {
    alert(err);
    // Reload page
  }

  addSpinner($el) {
    $el.addClass('active');
    spinner.spin($el[0]);
  }

  removeSpinner() {
    this.$overlays
      .removeClass('active')
      .find('.spinner')
        .remove();
  }

  giveFeedback(endpoint) {
    request
      .post(endpoint)
      .send({})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) this.onRequestFailed(err);
        else this.onRequestDone();
      });
  }
}

new AppView();

