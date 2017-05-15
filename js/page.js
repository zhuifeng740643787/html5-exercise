(function($) {
  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: '.swiper-pagination',

    // Navigation arrows
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',

    // And if we need scrollbar
    scrollbar: '.swiper-scrollbar',
  });

  $('#header .menus > ul > li').hover(function(event) {
    $(this).find('ul').addClass('active');
  }, function(event) {
    $(this).find('ul').removeClass('active');
  }).on('click', '>a', function(event) {
    var _ul = $(this).parent().find('ul');
    _ul.hasClass('active') ? _ul.removeClass('active') : _ul.addClass('active'); 
  })


  var deferred = $.Deferred().resolve();
  $window = $(window);
  $body = $('body');
  var $header = $('#header');
  var $menus = $header.find('.menus');
  var $actions = $header.find('.actions');
  var $banner = $('#banner');
  var $search = $('#search');
  var $menus_is_show = false;
  $menus._hide = function(event) {
    event.preventDefault();
    event.stopPropagation();
    $body.removeClass('is-menus-visible');
    $menus_is_show = false;
  }
  $menus._show = function(event) {
    event.preventDefault();
    event.stopPropagation();
    $body.addClass('is-menus-visible');
    $menus_is_show = true;
    var scrollTop = $window.scrollTop();
    $window.scroll(function() {
      $menus_is_show && $window.scrollTop(scrollTop);
    });
  }

  $actions.find('a[href="#menus"]').click($menus._show);
  $menus.find('i.fa-close').click($menus._hide);
  $banner.scrollex({
    bottom: '99%',
    enter: function() {
      $header.addClass('reveal');
    },
    leave: function() {
      $header.removeClass('reveal');
    }
  });

  $search._show = function(event) {
    $body.addClass('is-search-visible');
  }
  $search._hide = function(event) {
    $body.removeClass('is-search-visible');
    $search.find('input').val('');
  }
  $body._keyup = function(event) {
    if (event.keyCode == 13) {
      if ($body.hasClass('is-search-visible')) {
        //检索
        console.log($search.find('input').val())
      }
    } else if (event.keyCode == 27) {
      //退出
      $search._hide(event);
      $menus._hide(event);
    }
  }
  $actions.find('a[href="#search"]').click($search._show);
  $search.on('click', 'i.close', $search._hide);
  $body.on('keyup', $body._keyup);






})(jQuery);
