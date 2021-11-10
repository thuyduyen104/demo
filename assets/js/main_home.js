// Declare variable
var carts = [];
if (localStorage.getItem('carts') != null) {
    carts = JSON.parse(localStorage.getItem('carts'));
}

var path = 'http://localhost/LearnPHP/SellingBook/PHP/';

var books = [];

var page = 1, size = 20;

if(GetURLParameter('page') != -1) {
    page = parseInt(GetURLParameter('page'));
}
if(GetURLParameter('size') != -1) {
    size = parseInt(GetURLParameter('size'));
}

// Get data
function getDataBook() {
    var http = new XMLHttpRequest();

    http.open('GET', path + `api/get-databook.php?page=${page}&size=${size}`, true);

    http.send();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            books = JSON.parse(this.responseText);
            renderBooks();
        }
    }
}

// Set action for add to cart
function addToCart(id) {
    var hasCart = carts.find(function (value) {
        return value.id == id;
    });
    if (hasCart) {
        hasCart.so_luong += 1;
        showToast({
            message: `Số lượng sách trong giỏ hàng vừa được tăng thêm 1 : ${hasCart.ten_sach}`,
            type: 'info',
            duration: 2000
        });
    }
    else {
        var newCart = books.find(function (value) {
            return value.id == id;
        });
        carts.push({
            id: newCart.id,
            ten_sach: newCart.ten_sach,
            tac_gia: newCart.tac_gia,
            anh: newCart.anh,
            gia_ban: newCart.gia_ban,
            so_luong: 1
        });
        showToast({
            message: `Bạn đã thêm vào giỏ hàng sách: ${newCart.ten_sach}`,
            type: 'success',
            duration: 2000
        });
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    loadCart();
}

function removeFromCart(id) {
    var cart = books.find(function (value) {
        return value.id == id;
    });
    carts = carts.filter(function (value) {
        return value.id != id;
    });
    showToast({
        message: `Bạn vừa xóa trong giỏ hàng sách : ${cart.name}`,
        type: 'error',
        duration: 2000
    });
    localStorage.setItem('carts', JSON.stringify(carts));
    loadCart();
}

function loadCart() {
    var cartDOM = document.getElementById('cart-list');

    document.querySelector('.number-books-cart').innerHTML = carts.length

    if (carts.length > 0) {
        if (cartDOM.classList.contains('header-main--no-cart')) {
            cartDOM.classList.remove('header-main--no-cart');
        }

        var cartListDOM = document.querySelector('.app-header-main-cart__list-list');
        cartListDOM.innerHTML = '';

        carts.forEach(function (value) {
            var item = document.createElement('li');
            item.classList.add('app-header-main-cart-list__item');

            item.innerHTML = `
            <div class="app-header-main-cart-list-item__img">
                <img src="../assets/images/${value.anh}" alt="">
            </div>
            <div class="app-header-main-cart-list-item__info">
                <div>${value.ten_sach}</div>
                <p>${value.tac_gia}</p>
                <span onclick="removeFromCart(${value.id})">Xóa</span>
            </div>
            <div class="app-header-main-cart-list-item__price">
                <h4>${new Intl.NumberFormat().format(value.gia_ban)}</h4>
                <p>${value.so_luong}</p>
            </div>
            `;
            cartListDOM.append(item);
        });
    }
    else {
        if (!cartDOM.classList.contains('header-main--no-cart')) {
            cartDOM.classList.add('header-main--no-cart');
        }
    }
}

// Render data books
function renderBooks() {
    var listBooksDOM = document.querySelector('.app-content-books__list');
    listBooksDOM.innerHTML = '';
    var row = document.createElement('div');
    row.classList.add('row');

    books.forEach(function (value, index) {
        var col = document.createElement('div');
        col.classList.add('col', 'l-2-4', 'm-6', 'c-12');
        col.style.position = 'relative';

        col.innerHTML = `
        <div class="app-content-books__container">
            <a href="#" class="app-content-books__item">
                <div class="app-content-books-item__img">
                    <img src="../assets/images/${value.anh}" alt="">
                </div>
                <div class="app-content-books-item__info">
                    <div class="app-content-books-item-info__name">${value.ten_sach}</div>
                    <div class="app-content-books-item-info__author">${value.tac_gia}</div>
                    <div class="app-content-books-item-info__price">
                        <div class="app-content-books-item-info__price-current">${new Intl.NumberFormat().format(value.gia_ban)}đ</div>
                        <div class="app-content-books-item-info__price-old">${new Intl.NumberFormat().format(value.gia_chua_giam)}đ</div>
                        <div class="app-content-books-item-info__price-sale">-${value.giam_gia}%</div>
                    </div>
                </div>
            </a>
            <div class="app-content-books__pop-up">
                <div class="app-content-books-pop-up__name">${value.ten_sach}</div>
                <div class="app-content-books-pop-up__author">${value.tac_gia}</div>
                <div class="app-content-books-pop-up__price">
                    <div class="app-content-books-pop-up__price-current">${new Intl.NumberFormat().format(value.gia_ban)}đ</div>
                    <div class="app-content-books-pop-up__price-old">${new Intl.NumberFormat().format(value.gia_chua_giam)}đ</div>
                </div>
                <div class="app-content-books-pop-up__sale">Giảm giá: ${value.giam_gia}%</div>
                <div class="app-content-books-pop-up__btn">
                    <span onclick="addToCart(${value.id})">Thêm vào giỏ hàng</span>
                </div>
                <div class="app-content-books-pop-up__btn">
                    <a href="#">Xem chi tiết</a>
                </div>
            </div>
        </div>
        `;

        row.append(col);
    });

    listBooksDOM.append(row);
}


// Load pagination
function loadPagination() {
    var http = new XMLHttpRequest();

    http.open('GET', path + `api/get-numberbook.php?`, true);

    http.send();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadPaginationToView(this.responseText);
        }
    }
}

function loadPaginationToView(numberBook) {
    var tmp = (numberBook - numberBook%size)/size; // Chia lay nguyen
    var numberPage = (numberBook/size) > tmp ? tmp + 1 : tmp;
    var pageDOM = document.querySelector('.app-content__pagination');
    pageDOM.innerHTML = `
    <a href="home.html?page=1&size=${size}" class="app-content-pagination__first-page">Về trang đầu</a>
    <a href="home.html?page=${(page - 1 > 1) ? page - 1 : 1}&size=${size}" class="app-content-pagination__before-page"><</a>
    `;

    var from, to;
    if(page <= 3) {
        from = 1;
        to = 5;
    }
    else if(page + 2 > numberPage) {
        from = numberPage - 4;
        to = numberPage;
    }
    else {
        from = page - 2;
        to = page + 2;
    }
    for(let i = from; i <= to; i++) {
        pageDOM.innerHTML += `
        <a href="home.html?page=${i}&size=${size}" class="app-content-pagination__item-page">${i}</a>
        `;
        if(i == numberPage) break;
    }
    if(to < numberPage) {
        pageDOM.innerHTML += `
        <a href="home.html?page=${numberPage}&size=${size}" class="app-content-pagination__item-page">...</a>
        `;
    }

    pageDOM.innerHTML += `
    <a href="home.html?page=${(page + 1 < numberPage) ? page + 1 : numberPage}&size=${size}" class="app-content-pagination__before-page">></a>
    <a href="home.html?page=${numberPage}&size=${size}" class="app-content-pagination__last-page">Về trang cuối</a>
    `;

    var arr = document.querySelectorAll('.app-content-pagination__item-page');
    arr.forEach(function(value) {
        if(value.innerHTML == page) {
            value.classList.add('current-page');
        }
    })
}


// Call function
loadCategory();
getDataBook();
loadPagination();
loadCart();