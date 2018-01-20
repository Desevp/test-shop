
var cart = function() {
  var shoppingCart = {};

  function init() {
    changeCart($('.js-cart-product'));
    initDeleteProduct($('.js-cart-product-delete'));

    $('#js-delivery input').change(function() {
      updateTotalPrice();
    });
  }

  function addToCart(idItem, count) {
    var id = idItem;

    if (shoppingCart[id]) {
      shoppingCart[id] = parseInt(shoppingCart[id]) + parseInt(count);
    } else {
      shoppingCart[id] = count;
    }

    addToLocalStorage(shoppingCart);
  }

  function addToLocalStorage(obj) {
    localStorage.setItem('shoppingCart', JSON.stringify(obj));
  }

  function changeCart(elements) {

    elements.find('.js-counter-value').change(function() {
      updateCountProduct(
        $(this).closest('.js-cart-product').data('id'),
        $(this).val()
      );
      updateProductPrice($(this).closest('.js-cart-product'));
    });
  }

  function updateCountProduct(idItem, count) {
    if (shoppingCart[idItem]) {
      shoppingCart[idItem] = count;
      addToLocalStorage(shoppingCart);
    }
  }

  function updateProductPrice(product) {
    var productCounts = product.find('.js-counter-value').val(),
        totalProductPrice = product.find('.js-cart-product-total'),
        productPrice = product.find('.js-cart-product-price').data('price'),
        productSale = product.find('.js-cart-product-sale').data('sale');

    totalProductPrice.text(parseInt(productCounts) * productPrice * (1 - productSale / 100));
    updateTotalPrice();
  }

  function initDeleteProduct(btn) {
    btn.on('click', function() {
      aa= $(this).closest('.js-cart-product').data('id');
      delFromCart($(this).closest('.js-cart-product').data('id'));
    });
  }

  function delFromCart(id) {
    if (shoppingCart[id]) {
      var product = $('.js-cart-product').filter('[data-id="' + id + '"]');
      var timeoutDel = 300;


      delete shoppingCart[id];
      addToLocalStorage(shoppingCart);

      if (jQuery.isEmptyObject(shoppingCart)) {
        $('.js-cart').fadeOut(timeoutDel);
        setTimeout(function(){
          $('.js-cart').empty();
          $('.js-cart').wrapInner('<div class="cart__empty">В корзине пусто</div>');
          $('.js-cart').fadeIn(timeoutDel);
        }, timeoutDel);
      }
      else {
        product.slideUp(timeoutDel);
        setTimeout(function(){
          product.remove();
          updateTotalPrice();
        }, timeoutDel);
      }
    }
  }

  function getShipiningValue() {
    var minPrice = parseInt($('#js-delivery').data('delivery-max-price')),
        price = getTotalPrice(),
        courierTextEl = $('.js-delivery-courier').siblings('label').find('span');

    if (price >= minPrice) {
      $('.js-delivery-courier').val('0');
      courierTextEl.html('0');
    }
    else {
      var deliveryPriceEl = $('.js-delivery-courier'),
          deliveryPriceValue = deliveryPriceEl.data('delivery-price');

      deliveryPriceEl.val(deliveryPriceValue);
      courierTextEl.html(deliveryPriceValue);
    }
    return parseInt($('#js-delivery input').filter(':checked').val());
  }

  function getTotalPrice() {
    totalPrice = 0;
    $('.js-cart-product-total').each(function(){
      totalPrice = totalPrice + parseInt($(this).text());
    });
    return totalPrice;
  }

  function updateTotalPrice() {
    $('.js-subtotal-price').text(new Intl.NumberFormat('ru-RU').format(getTotalPrice()));
    var price = getShipiningValue() + getTotalPrice();
    $('.js-total-price').text(price);
  }

  return {
    addToCart: function(idItem, itemCount) {
      addToCart(idItem, itemCount);
    },
    init: function() {
      init();
    }
  }
}();

cart.addToCart('1', 1);
cart.addToCart('2', 1);

cart.init();
