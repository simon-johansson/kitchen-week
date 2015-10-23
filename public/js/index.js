
(function (window, $) {

  var opts = {
    lines: 13 // The number of lines to draw
  , length: 28 // The length of each line
  , width: 14 // The line thickness
  , radius: 42 // The radius of the inner circle
  , scale: 0.8 // Scales overall size of the spinner
  , corners: 1 // Corner roundness (0..1)
  , color: '#000' // #rgb or #rrggbb or array of colors
  , opacity: 0.25 // Opacity of the lines
  , rotate: 0 // The rotation offset
  , direction: 1 // 1: clockwise, -1: counterclockwise
  , speed: 1 // Rounds per second
  , trail: 60 // Afterglow percentage
  , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
  , zIndex: 2e9 // The z-index (defaults to 2000000000)
  , className: 'spinner' // The CSS class to assign to the spinner
  , top: '50%' // Top position relative to parent
  , left: '50%' // Left position relative to parent
  , shadow: false // Whether to render a shadow
  , hwaccel: false // Whether to use hardware acceleration
  , position: 'absolute' // Element positioning
  }
  var $button = $('.btn');
  // var loading = $button.ladda();
  var reloadInterval = 1800000; // 30 minutes
  var reloadTimer;
  resetReloadTimer();

  $button.on('click', function(event) {
    event.preventDefault();
    var $el = $(this);
    $el.find('.overlay').addClass('active');
    // var loading = $el.ladda();
    var target = $(this)[0];
    var spinner = new Spinner(opts).spin(target);
    // var msg = $el.data('msg');
    var msg = 'test';

    // loading.ladda('start');
    resetReloadTimer();
    makeRequest(target, msg);
  });

  function resetReloadTimer() {
    clearTimeout(reloadTimer);
    reloadTimer = setTimeout(function () {
      location.reload();
    }, reloadInterval);
  }

  function makeRequest(loading, msg) {
    $.ajax({
      url: '/poke',
      type: 'POST',
      dataType: 'json',
      data: {
        emails: window.emails, // variable is set in index.jade
        feedback: msg
      },
    })
    .done(function(data) {
      console.log("success");
    })
    .fail(function(error) {
      alert(error.error);
      console.log("error");
    })
    .always(function(data) {
      // loading.ladda('stop');
      console.log("complete");
    });
  }

})(window, jQuery);
