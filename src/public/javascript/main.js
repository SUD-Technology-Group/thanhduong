$('.cs-3').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 3,
        },
    },
});

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
});

$('.owl-prev').addClass('d-none');
$('.owl-next').addClass('d-none');

window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        $('.header-top').hide();
        $('#header-body').hide();
        $('#header-body-2').removeClass('d-none');
    } else {
        $('.header-top').show();
        $('#header-body').show();
        $('#header-body-2').addClass('d-none');
    }
}

//to top button
const toTopButton = document.querySelector('.to-top-btn');
toTopButton.addEventListener('click', () => {
    document.body.scrollIntoView({ behavior: 'smooth' });
});

//introduction page - reason box
const reasons = document.querySelectorAll('.reason');
reasons.forEach((item) => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');

        const icon = item.querySelector('.reason__icon i');
        if (icon.className === 'uil uil-plus') {
            icon.className = 'uil uil-minus';
        } else {
            icon.className = 'uil uil-plus';
        }
    });
});

//show/hide menu button -- responsive
const openButton = document.querySelector('.open-menu-btn');
const closeButton = document.querySelector('.close-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navMenu2 = document.querySelector('.nav-menu-2');

openButton.addEventListener('click', () => {
    navMenu.style.display = 'block';
    openButton.style.display = 'none';
    closeButton.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    navMenu.style.display = 'none';
    closeButton.style.display = 'none';
    openButton.style.display = 'block';
});

const openButton2 = document.querySelector('.open-menu-btn-2');
const closeButton2 = document.querySelector('.close-menu-btn-2');

openButton2.addEventListener('click', () => {
    navMenu2.style.display = 'block';
    openButton2.style.display = 'none';
    closeButton2.style.display = 'block';
});

closeButton2.addEventListener('click', () => {
    navMenu2.style.display = 'none';
    closeButton2.style.display = 'none';
    openButton2.style.display = 'block';
});

// show modal form
const modal = document.querySelector('.modal__signin');
const closeModalButton = document.querySelector('.modal__header__icon__close');

setTimeout(() => {
    modal.style.display = 'flex';
}, 180000);

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

//show modal form for logging
const user = document.querySelectorAll('.fa-user');
const modalLogin = document.querySelector('.modal__login');
const closeModalLoginButton = document.querySelector('.modal__login__header__icon__close');

user.forEach((item) => {
    item.addEventListener('click', () => {
        console.log(item);
        modalLogin.style.display = 'flex';
    });
});

closeModalLoginButton.addEventListener('click', () => {
    modalLogin.style.display = 'none';
});

//replace main-image when click sub-image - product detail
const mainImage = document.querySelector('.detail__container__left__img img');
const subImages = document.querySelectorAll('.detail__container__sub__img img');
console.log(subImages);

subImages.forEach((image) => {
    image.addEventListener('click', () => {
        console.log(1);
        mainImage.setAttribute('src', image.getAttribute('src'));
    });
});

//Toggle Spinner load animation when searching
const searchInput = document.querySelector('.search__box__left input');
const searchInput2 = document.querySelector('.search__box__left__2 input');
const searchGlass = document.querySelector('.searchGlass');
const spinner = document.querySelector('.spinner');
const searchGlass2 = document.querySelector('.searchGlass__2');
const spinner2 = document.querySelector('.spinner__2');

searchInput.addEventListener('keypress', () => {
    searchGlass.style.display = 'none';
    spinner.style.display = 'block';
});

searchInput.addEventListener('keyup', () => {
    setTimeout(() => {
        searchGlass.style.display = 'block';
        spinner.style.display = 'none';
    }, 3000);
});

searchInput2.addEventListener('keypress', () => {
    searchGlass2.style.display = 'none';
    spinner2.style.display = 'block';
});

searchInput2.addEventListener('keyup', () => {
    setTimeout(() => {
        searchGlass2.style.display = 'block';
        spinner2.style.display = 'none';
    }, 4000);
});

//Catch enter button when user press enter in mobile
const searchBar = document.querySelector('.nav__menu__input input');
const searchBar2 = document.querySelector('.nav__menu__2__input input');

searchBar.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        location.href = '/result';
    }
});

searchBar2.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        location.href = '/result';
    }
});

//open modal when click buy-now button
const buyNowBtn = document.querySelector('.buy-box');
buyNowBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});
