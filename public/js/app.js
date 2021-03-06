
import request from 'superagent';
import $ from 'jquery';
import attachFastClick from 'fastclick';
import sweetalert from 'sweetalert';
import spinner from './spinner';
import {randomFeedbackAnimation} from './feedback-animations';



class AppView {
  constructor() {
    this.$btns = $('.feedback-button');
    this.$overlays = $('.overlay');
    this.refreshInterval = 1800000; // 30 minutes
    // this.refreshInterval = 5000; // 5 seconds
    this.refreshTimer = undefined;

    attachFastClick(document.body);
    document.ontouchmove = e => e.preventDefault();

    // this.testConnection();
    this.bindClickEvent();
    this.resetRefreshTimer();

  }

  bindClickEvent() {
    this.$btns.on('click', ::this.onButtonClicked);
  }

  unbindClickEvent() {
    this.$btns.off('click');
  }

  resetRefreshTimer() {
    clearTimeout(this.refreshTimer);
    this.refreshTimer = setTimeout(() => {
      location.reload();
    }, this.refreshInterval);
  }

  testConnection() {
    alert(navigator.onLine);
  }

  onButtonClicked(ev) {
    const $el = $(ev.currentTarget);
    const feedbackType = $el.data('type');
    const $overlay = $el.find('.overlay');

    randomFeedbackAnimation();
    this.resetRefreshTimer();
    this.unbindClickEvent();
    this.addSpinner($overlay);
    this.giveFeedback(feedbackType);
  }

  onRequestDone() {
    this.removeSpinner();
    this.bindClickEvent();
    // Show "ok" symbol
  }

  onRequestFailed(err) {
    sweetalert({
      title: 'Something went wrong!',
      text: `${err}

              Please reload the page and try the same thing again.
              If that doesn't work then talk to Simon (the tall one).`,
      type:  'error',
      confirmButtonText: 'RELOAD',
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      confirmButtonColor: '#c61c59',
    }, () => location.reload());
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

  giveFeedback(feedbackType) {
    request
      .post('/feedback')
      .send({type: feedbackType})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) this.onRequestFailed(err);
        else this.onRequestDone();
      });
  }
}

new AppView();

