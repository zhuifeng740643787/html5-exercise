(function($) {

  skel.breakpoints({
    xlarge: '(max-width: 1680px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)',
    xxsmall: '(max-width: 360px)'
  });
  $.fn._parallax = (skel.vars.browser == 'ie' || skel.vars.browser == 'edge' || skel.vars.mobile) ?
    function() {
      return $(this);
    } :
    function(intensity) {
      var $window = $(window);
      var $this = $(this);
      if (this.length == 0 || intensity === 0) {
        return $this;
      }
      if (this.length > 1) {
        for (var i = 0; i < this.length; i++) {
          $(this[i])._parallax(intensity);
        }
        return $this;
      }
      if (!intensity) {
        intensity = 0.25;
      }
      $this.each(function() {
        var $t = $(this);
        var on;
        var off;
        on = function() {
          $t.css('background-position', 'center 100%, center 100%, center 0px');
          $window.on('scroll._parallax', function() {
            var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);
            $t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');
          });
        };
        off = function() {
          $t.css('background-position', '');
          $window.off('scroll._parallax');
        };
        skel.on('change', function() {
          if (skel.breakpoint('medium').active) {
            (off)();
          } else {
            (on)();
          }
        });
      });
      $window.off('load._parallax resize._parallax')
        .on('load._parallax resize._parallax', function() {
          $window.trigger('scroll');
        });
      return $this;
    };


  // window ready
  $(function() {
    var $window = $(window);
    var $body = $('body');
    var $wrapper = $('#wrapper');
    var $header = $('#header');
    var $banner = $('#banner');

    $body.addClass('is-loading');
    $window.on('load pageshow', function() {
      window.setTimeout(function() {
        $body.removeClass('is-loading');
      }, 100);
    });
    $window.on('unload pagehide', function() {
      window.setTimeout(function() {
        $('.is-transitioning').removeClass('is-transitioning');
      }, 250);
    });
    if (skel.vars.browser == 'ie' || skel.vars.browser == 'edge') {
      $body.addClass('is-ie');
    }
    $('form').placeholder();
    skel.on('+medium -medium', function() {
      $.prioritize('.important\\28 medium\\29', skel.breakpoint('medium').active);
    });

    $('.scrolly').scrolly({
      offset: function() {
        return $header.height() - 2;
      }
    });
    var $tiles = $('.tiles > article');
    $tiles.each(function() {
      var $this = $(this);
      var $image = $this.find('.image');
      var $img = $this.find('img');
      var $link = $this.find('.link');
      var x;
      $this.css('background-image', 'url(' + $img.attr('src') + ')');
      if (x = $img.data('position')) {
        $image.css('background-position', x);
      }
      $image.hide();
      if ($link.length > 0) {
        $x = $link.clone().text('').addClass('primary').appendTo($this);
        $link = $link.add($x);
        $link.on('click', function(event) {
          var href = $link.attr('href');
          event.preventDefault();
          event.stopPropagation();
          $this.addClass('is-transitioning');
          $wrapper.addClass('is-transitioning');
          window.setTimeout(function() {
            if ($link.attr('target') == '_blank') {
              window.open(href);
            } else {
              window.location.href = href;
            }
          }, 500);
        });
      }
    });

    if (skel.vars.IEVersion < 9) {
      $header.removeClass('alt');
    }
    if ($banner.length > 0 && $header.hasClass('alt')) {
      $window.on('resize', function() {
        $window.trigger('scroll');
      });
      $window.on('load', function() {
        $banner.scrollex({
          bottom: $header.height() + 10,
          terminate: function() {
            $header.removeClass('alt');
          },
          enter: function() {
            $header.addClass('alt');
          },
          leave: function() {
            $header.removeClass('alt').addClass('reveal');
          }
        });
        window.setTimeout(function() {
          $window.triggerHandler('scroll');
        }, 100);
      });
    }

    $banner.each(function() {
      var $this = $(this);
      var $image = $this.find('.image');
      var $img = $this.find('img');
      $this._parallax(0.275);
      if ($image.length > 0) {
        $this.css('background-image', 'url(' + $img.attr('src') + ')');
        $image.hide();
      }
    });

    var $menu = $('#menu');
    var $menuInner;
    $menu.wrapInner('<div class="inner"></div>');
    $menuInner = $menu.children('.inner');
    $menu._locked = false;
    $menu._lock = function() {
      if ($menu._locked) {
        return false;
      }
      $menu._locked = true;
      window.setTimeout(function() {
        $menu._locked = false;
      });
      return true;
    };
    $menu._show = function() {
      if ($menu._lock()) {
        $body.addClass('is-menu-visible');
      }
    };
    $menu._hide = function() {
      if ($menu._lock()) {
        $body.removeClass('is-menu-visible');
      }
    };
    $menu._togger = function() {
      if ($menu._lock()) {
        $body.toggleClass('is-menu-visible');
      }
    }

    $menuInner.on('click', function(event) {
      event.stopPropagation();
    }).on('click', 'a', function(event){
      event.preventDefault();
      event.stopPropagation();
      var href = $(this).attr('href');
      $menu._hide();
      window.setTimeout(function(){
        window.location.href = href;
      }, 250);
    });
    $menu.appendTo($body).on('click', function(){
      event.preventDefault();
      event.stopPropagation();
      $body.removeClass('is-menu-visible');
    }).append('<a class="close" href="#menu">Close</a>');
    $body.on('click', 'a[href="#menu"]', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $menu._togger();
    }).on('click', function(event) {
      $menu._hide();
    }).on('keydown', function(event) {
      if (event.keyCode == 27) {
        $menu._hide();
      }
    });


  });












})(jQuery);
