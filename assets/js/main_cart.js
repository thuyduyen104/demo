// Declare variable
var carts = [];
if(localStorage.getItem('carts') != null) {
    carts = JSON.parse(localStorage.getItem('carts'));
}

// JSON

// Load list cart
function loadListCart() {
    var cartListDOM = document.querySelector('.app-content-cart-list__list');
    cartListDOM.innerHTML = '';

    var totalBooks = 0;
    var totalPrice = 0;
    
    
    if(carts.length > 0) {
        carts.forEach(function(value) {
            totalBooks += value.quantity;
            totalPrice += value.currentPrice * value.quantity;
    
            var cartDOM = document.createElement('div');
            cartDOM.classList.add('app-content-cart-list__item');
    
            cartDOM.innerHTML = `
            <div class="app-content-cart-list-item__img">
                <img src="../assets/images/${value.image}" alt="">
            </div>
            <div class="app-content-cart-list-item__body">
                <div class="app-content-cart-list-item-body__name">${value.name}</div>
                <div class="app-content-cart-list-item-body__author">${value.author}</div>
                <span class="app-content-cart-list-item-body__remove" onclick="showDialogQuestion(${value.id})">Xóa</span>
            </div>
            <div class="app-content-cart-list-item__price">${new Intl.NumberFormat().format(value.currentPrice)}đ</div>
            <div class="app-content-cart-list-item__quantiy">
                <div class="app-content-cart-list-item-quantiy__down" onclick="downQuantity(${value.id})">-</div>
                <div class="app-content-cart-list-item-quantiy__input">
                    <input type="text" value="${value.quantity}">
                </div>
                <div class="app-content-cart-list-item-quantiy__up" onclick="upQuantity(${value.id})">+</div>
            </div>
            `;
    
            cartListDOM.appendChild(cartDOM);
        });
    }
    else {
        cartListDOM.classList.add('cart-empty');
        cartListDOM.innerHTML = `
        <h2>Giỏ hàng trống</h2>
        <img src="../assets/images/empty-cart.png" alt="empty-cart">
        <div><a class="app__btn" href="home.html">Quay về trang mua sách</a></div>
        `;

        document.querySelector('.app-content-cart-list-checkout__btn').style.backgroundColor = '#999';
        document.querySelector('.app-content-cart-list-checkout__btn').style.cursor = 'default';
    }

    document.querySelector('.app-content-cart-list-checkout-body__quantity')
            .innerHTML = `${totalBooks} sản phẩm`;
    document.querySelector('.app-content-cart-list-checkout-body__total-price')
            .innerHTML = `${new Intl.NumberFormat().format(totalPrice)}đ`;
}

// Quantity up down
function upQuantity(id) {
    var cart = carts.find(function(value) {
        return value.id == id;
    });

    if(cart.quantity < 1) {
        cart.quantity = 1;
    }
    else {
        cart.quantity++;
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    loadListCart();
}

function downQuantity(id) {
    var cart = carts.find(function(value) {
        return value.id == id;
    });

    if(cart.quantity <= 1) {
        cart.quantity = 1;
    }
    else {
        cart.quantity--;
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    loadListCart();
}

// Show Dialog
function showDialog({ title = '', content = '', btn1 = '', btn2 = '' , id = 0}) {
    var modalDOM = document.querySelector('.modal');
    modalDOM.innerHTML = '';

    var dialog = document.createElement('div');
    dialog.classList.add('modal__dialog');

    dialog.innerHTML = `
    <div class="modal-dialog__title">${title}</div>
    <div class="modal-dialog__content">${content}</div>
    <div class="modal-dialog__btn">
        <span class="modal-dialog__btn-yes" onclick="closeDialog(), removeItem(${id})">${btn1}</span>
        <span class="modal-dialog__btn-no" onclick="closeDialog()">${btn2}</span>
    </div>
    `;

    modalDOM.appendChild(dialog);
    modalDOM.style.display = 'block';
}

function closeDialog() {
    var modalDOM = document.querySelector('.modal');
    modalDOM.innerHTML = '';
    modalDOM.style.display = 'none';

}

// Remove item
function showDialogQuestion(id) {
    var cart = carts.find(function(value) {
        return value.id == id;
    });
    
    showDialog({
        title: 'Xóa',
        content: `Bạn có muốn xóa sách ${cart.name} trong giỏ hàng không?`,
        btn1: 'Có',
        btn2: 'Không',
        id: cart.id
    });
}

function removeItem(id) {
    var cart = carts.find(function(value) {
        return value.id == id;
    });

    carts = carts.filter(function(value) {
        return value.id != id;
    });

    showToast({
        message: 'Bạn vừa xóa sách trong giỏ hàng: ' + cart.name,
        type: 'error',
        duration: 2000 
    });
    localStorage.setItem('carts', JSON.stringify(carts));
    loadListCart();
}

// Call function
loadListCart();