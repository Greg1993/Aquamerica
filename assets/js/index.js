/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);

(function (event) {
  function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
  }

  function EventListener(eventArray, fn, HTMLElementArray) {
    for (var i = 0; i < eventArray.length; i++) {
      for (var j = 0; j < HTMLElementArray.length; j++) {
        HTMLElementArray[j].addEventListener(eventArray[i], fn);
      }
    }
  }

  var setDescription = (function () {
    var previousId = 7;
    var descr = document.getElementsByClassName('swan-description');
    var swans = document.getElementsByClassName('swan');
    // for (var i = 0; i < descr.length i++) {
    //   descr[i].remove();
    // }
    return function (e) {
      if (typeof e !== "number") {
        if (!/^swan\-[0-7]/.test(e.target.id)) { return; }
        window.location.hash = '#/' + e.target.id;
        return;
      }
      var id = e;
      if ((id >= descr.length) || (id === previousId && id !== 7)) { return; }
      swans[previousId].classList.remove('active');
      descr[previousId].classList.remove('active');
      swans[id].classList.add('active');
      descr[id].classList.add('active');
      previousId = id;
      /* Listen for a transition! */
      // var transitionEvent = whichTransitionEvent();
      // transitionEvent && e.addEventListener(transitionEvent, function() {
      //   console.log('Transition complete!  This is the callback, no library needed!');
      // });
    }
  })();

  function loadHash() {
    var hashArray = window.location.hash.split('/');
    var urlPart = hashArray[hashArray.length - 1];
    if (/^swan\-[0-9]/.test(urlPart)) {
      setDescription(parseInt(urlPart.slice(5)));
    } else {
      setDescription(7);
    }
  }

  function init() {
    var prefOnhashchange = (window.onhashchange || function () {});
    window.onhashchange = function (e) {
      loadHash();
      return prefOnhashchange(e);
    };
    EventListener([
      "mouseover"
    ], setDescription, document.getElementsByClassName('swan-bg'));

    setTimeout(loadHash, 100);
  }
  return init;
})()();

