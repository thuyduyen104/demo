// Declare variable
var categories = [
    {
        id: 1,
        name: 'Truyện tranh',
    },
    {
        id: 2,
        name: 'Kinh tế',
    },
    {
        id: 3,
        name: 'Xã hội',
    },
    {
        id: 4,
        name: 'Văn hóa - Chính trị',
    },
    {
        id: 5,
        name: 'Ngoại ngữ',
    },
    {
        id: 6,
        name: 'Công nghệ',
    },
    {
        id: 7,
        name: 'Lập trình',
    }
];

// Set action for category box
function loadCategory() {
    var cateDOM = document.querySelector('.app-header-main-search-filter__choose');
    cateDOM.innerHTML = '<li class="app-header-main-search-filter-choose__item active-color" onclick="categoryChange(-1, 0)">Tất cả</li>';

    categories.forEach(function (value, index) {
        cateDOM.innerHTML += `<li class="app-header-main-search-filter-choose__item" onclick="categoryChange(${index}, ${value.id})">${value.name}</li>`;
    });
}

function categoryChange(index, id) {
    var cateList = document.querySelectorAll('.app-header-main-search-filter-choose__item').forEach(function (value) {
        if (value.classList.contains('active-color')) {
            value.classList.remove('active-color');
        }
    });
    var dom = document.querySelector(`.app-header-main-search-filter-choose__item:nth-child(${index + 2})`);
    dom.classList.add('active-color');

    var textDOM = document.querySelector('.app-header-main-search-filter__current > p');
    textDOM.innerHTML = dom.innerHTML;

    document.querySelector('#cate').value = id;
}

// Get param
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return -1;
}


// Call function
loadCategory();