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
            items: 2,
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
const navMenu2 = document.querySelector('.nav-menu-2');

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
}, 3000);

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

//show modal form for logging
const user = document.querySelectorAll('.fa-user');
const modalLogin = document.querySelector('.modal__login');
const closeModalLoginButton = document.querySelector('.modal__login__header__icon__close');

user.forEach((item) => {
    item.addEventListener('click', () => {
        modalLogin.style.display = 'flex';
    });
});

closeModalLoginButton.addEventListener('click', () => {
    modalLogin.style.display = 'none';
});
