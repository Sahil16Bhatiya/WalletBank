//navbar
$('.trigger').click(function() {
  $(this).toggleClass('active');
  $('.menu').toggleClass('open');
  $('.screen').toggleClass('hidden');
});

// sort content
$(function() {
  $('#sortabletwo').sortable({
    revert: true,
    axis: "x"
  });
  $('div').disableSelection();
});

// author
$('.author').click(function() {
  $('.on').toggleClass('off');
  $('.name').toggleClass('non');
});

$('.topics div').click(function() {
  $(this).toggleClass('full');
});

// slider
let route;
$(".map").draggable({
  drag: function(event, ui) {
    var h =
        $(this)
          .parent()
          .height() - $(this).height(),
      w =
        $(this)
          .parent()
          .width() - $(this).width();
    ui.position.left > 0 && (ui.position.left = 0);
    ui.position.top > 0 && (ui.position.top = 0);
    ui.position.left < w && (ui.position.left = w);
    ui.position.top < h && (ui.position.top = h);
    Math.abs(route[0] - ui.position.top) < 50 && (ui.position.top = route[0]);
  },
  start: function(event, ui) {
    route = [ui.position.top, ui.position.left];
  },
  stop: function(event, ui) {
    var pos = {},
      w =
        Math[route[1] < ui.position.left ? "ceil" : "floor"](
          ui.position.left / 175
        ) * 175;
    var w =
      Math[
        Math.abs(route[0] - ui.position.top) > 50
          ? "round"
          : route[1] < ui.position.left ? "ceil" : "floor"
      ](ui.position.left / 175) * 175;
    Math.abs(route[0] - ui.position.top) > 50 &&
      $(this).animate(
        {
          top: route[0] > ui.position.top ? -175 : 0
        },
        600
      );
    $(this).animate(
      {
        left: w
      },
      600
    );
  }
});

// pressing mouse scroll content (mouse wheel is disabled)
(function($) {
  $.fn.touchanddrag = function() {
    this.wrapInner("<div>");
    var box = this,
      data = this.children();
    box.css({ overflow: "hidden" });
    data.css({ position: "relative", cursor: "default" });
    // touch and drag content
    data.mousedown(function(e) {
      var hgtBox = box.height(),
        hgtData = data.height();
      if (hgtData > hgtBox) {
        var posTap = e.pageY,
          posData = data.position().top,
          posShift,
          mouseMove = function(e) {
            if (e.which == 1) {
              posShift = e.pageY - posTap;
              if (data.position().top > 0) {
                data.css({ top: (posData + posShift) / 5 });
              } else if (data.position().top + hgtData < hgtBox) {
                data.css({ top: hgtBox - hgtData + posShift / 5 });
              } else {
                data.css({ top: posData + posShift });
              }
            } else {
              mouseUp();
            }
          },
          mouseUp = function() {
            $(document)
              .off("mousemove", mouseMove)
              .off("mouseup", mouseUp);
            $(document).off("mousedown", selection);
            data.css({ cursor: "default" });
            if (data.position().top > 0) {
              data.animate({ top: 0 }, 250);
            } else if (data.position().top + hgtData < hgtBox) {
              data.animate({ top: hgtBox - hgtData }, 250);
            }
          },
          selection = function() {
            if (window.getSelection) {
              window.getSelection().removeAllRanges();
            } else {
              document.selection.empty();
            }
            return false;
          };
        data.css({ cursor: "move" });
        $(document)
          .on("mousedown", selection)
          .on("mousemove", mouseMove);
        $(document)
          .on("mouseup", mouseUp)
          .on("contextmenu", mouseUp);
        $(window).on("blur", mouseUp);
      }
    });
    return this;
  };
})(jQuery);

$(document).ready(function() {
  $("#content").touchanddrag();
});