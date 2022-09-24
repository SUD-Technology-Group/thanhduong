const mainImage = document.querySelector('.detail__container__left__img img');
const subImages = document.querySelectorAll('.detail__container__sub__img img');

subImages.forEach((image) => {
    image.addEventListener('click', () => {
        mainImage.setAttribute('src', image.getAttribute('src'));
    });
});
