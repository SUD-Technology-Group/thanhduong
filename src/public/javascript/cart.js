$('.alert').hide('fade');

var shoppingCart = (function () {
    // Private methods and propeties
    cart = [];

    // Constructor
    function Item(image, name, price, count) {
        this.image = image;
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem('shoppingCart') != null) {
        loadCart();
    }

    // Public methods and propeties
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (image, name, price, count) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(image, name, price, count);
        cart.push(item);
        saveCart();
    };
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    };

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    };

    // Count cart
    obj.totalCount = function () {
        return cart.length;
    };

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return totalCart;
    };

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = item.price * item.count;
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();

// *****************************************
// Triggers / Events
// *****************************************
// Add item
$('.add-to-cart').click(function (event) {
    event.preventDefault();
    
    $('.alert').show('fade', () => {
        setTimeout(() => {
            $('.alert').hide('fade');
        }, 5000)
    });
    
    var name = $(this).data('name');
    var price = $(this).data('price');
    const image = $(this).data('image');
    shoppingCart.addItemToCart(image, name, price, 1);
    displayCart();
});

function formatCurrency(price) {
    if (price && price != 0) return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' VNĐ';
    return 'Liên hệ';
}

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = '';
    for (var i in cartArray) {
        output += `<div class='card mb-3'>
                        <div class='card-body'>
                            <div class='d-flex justify-content-between align-items-center'>
                                <div>
                                    <img
                                        src='${cartArray[i].image}'
                                        class='img-fluid rounded-3'
                                        alt='Shopping item'
                                        style='width: 100px;'
                                    />
                                </div>
                                <h5 style='width: 150px;'>${cartArray[i].name}</h5>
                                <h5 class='mb-0'>${formatCurrency(cartArray[i].price)}</h5>
                                <div style='width: 110px;'>
                                    <div class='input-group'>
                                        <button class='minus-item input-group-addon btn btn-light' data-name='${
                                            cartArray[i].name
                                        }'>-</button>
                                        <input type='number' min='1' class='item-count form-control' data-name='${
                                            cartArray[i].name
                                        }' value='${cartArray[i].count}'>
                                        <button class='plus-item btn btn-light input-group-addon' data-name='${
                                            cartArray[i].name
                                        }'>+</button>
                                    </div>
                                </div>
                                <h5 class='mb-0'>${formatCurrency(cartArray[i].total)}</h5>
                                <button class='delete-item btn btn-danger' data-name='${
                                    cartArray[i].name
                                }'><i class='fas fa-trash-alt'></i></button>
                            </div>
                        </div>
                    </div>`;
    }
    $('.show-cart').html(output);
    $('.total-cart').html(formatCurrency(shoppingCart.totalCart()));
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button
$('.show-cart').on('click', '.delete-item', function (event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
});

// -1
$('.show-cart').on('click', '.minus-item', function (event) {
    var name = $(this).data('name');
    shoppingCart.removeItemFromCart(name);
    displayCart();
});
// +1
$('.show-cart').on('click', '.plus-item', function (event) {
    var name = $(this).data('name');
    shoppingCart.addItemToCart('', name);
    displayCart();
});

// Item count input
$('.show-cart').on('change', '.item-count', function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();
