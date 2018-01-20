// document.addEventListener('DOMContentLoaded', function(){});
// (function(){
// код
// }());

// Counters
var initCounter = function() {
  var $this = $(this),
    btnMinus = $this.find('.js-counter-minus'),
    btnPlus = $this.find('.js-counter-plus'),
    input = $this.find('.js-counter-value'),
    disableClassName = 'counter__btn_is-disable';

    if (input.val() === '1') {
      btnMinus.addClass(disableClassName);
    }

    btnMinus.on('click', function() {
      var value = parseInt(input.val());

      if (value === 1) return;

      value--;
      input.val(value).trigger('change');

      if (value === 1) {
        $(this).addClass(disableClassName);
      }
    });

    btnPlus.on('click', function() {
      var value = parseInt(input.val());

      value++;
      input.val(value).trigger('change');

      if (btnMinus.hasClass(disableClassName)) {
        btnMinus.removeClass(disableClassName);
      }
    });
};

$('.js-counter').each(initCounter);
