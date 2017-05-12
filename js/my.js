(function($) {


  var $window = $(window);
  var $body = $('body');
  var $header = $('#header');
  var $main = $('#main');
  var $banner = $('#banner');

  $('body').addClass('is-loading');
  $(window).on('load pageshow', function() {
    $('body').removeClass('is-loading');
  });

  $banner.scrollex({
    bottom: "10%",
    enter: function() {
      $header.removeClass('alt');
    },
    leave: function() {
      $header.addClass('alt');
    }
  });

  $('.go-menu').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('body').addClass('is-menu-visible');
  });

  $('#menu .close, body').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('body').removeClass('is-menu-visible');
  }).on('keydown', function(event) {
    if (event.keyCode == 27) {
      $('body').removeClass('is-menu-visible');
    }
  });

  $('#menu ul a').on('click', function(event){
    $('body').removeClass('is-menu-visible');
    var _this = $(this);
    window.setTimeout(function(){
      window.location.href = _this.attr('href');
    }, 250);    
  }); 












})(jQuery);
