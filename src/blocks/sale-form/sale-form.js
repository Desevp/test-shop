(function(){
  var saleForm = $('#js-sale-form'),
      saleFormSubmit = $('.js-sale-form-btn');

  saleFormParams = {
    errorClass: 'field-input_error',
    rules: {
      'saleСoupon': {
        required: true
      }
    },
    messages: {
      'saleСoupon': {
        required: 'Введите купон'
      }
    },
    errorPlacement: function(error, element) {
      var currentName = element.attr('name');
      var errorMessage = saleFormValidate.settings.messages[currentName].required;

      element.attr('placeholder', errorMessage);
    }
  }

  var saleFormValidate = saleForm.validate(saleFormParams);

  saleFormSubmit.click(function(){
    if (saleForm.valid()) {
      $.ajax({
          url: '',
          type: 'post',
          data: saleForm.serialize(),
          success: function(data, textStatus, jqXHR) {
            var message;
            // TODO: add сheck сoupon
            if (!data) {
              message = 'Coupon is not valid';
            }
            else {
              message = 'Coupon is valid';
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              saleFormSubmit.text('Попробуйте еще раз');
          }
      });
    }
  });
}());
