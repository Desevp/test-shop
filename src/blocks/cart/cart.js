// document.addEventListener('DOMContentLoaded', function(){});
// (function(){
// код
// }());

var cart = function() {
  var shoppingCart = {};

  function init() {
    changeCart($('.js-cart-product'));
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

    function getLocalStorage(name) {
      if (localStorage.getItem(name)) {
        return JSON.parse(localStorage.getItem(name));
      }
    }

    function changeCart(elements) {

      elements.find('.js-counter-value').change(function() {
        updateCountProduct(
          $(this).closest('.js-cart-product').data('id'),
          $(this).val()
        );
      });
    }

    function updateCountProduct(idItem, count) {
      console.log('counter');
      if (shoppingCart[idItem]) {
        shoppingCart[idItem] = count;
        addToLocalStorage(shoppingCart);
      }
    }














  console.log('LocalStorage');

  console.log(getLocalStorage('shoppingCart'));




  return {
    // init: init,
    addToCart: function(idItem, itemCount) {
      addToCart(idItem, itemCount);
    },
    init: function() {
      init();
    }
  }
}();

cart.addToCart('id1', 1);
cart.addToCart('id2', 5);

cart.init();
