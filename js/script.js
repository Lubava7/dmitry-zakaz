console.log('commit version 21 - added modal for big photos');
// HEADER
Header.render('.insert-header');
Modal.render();

const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const carouselDiv = document.getElementById('carousel-div');
const allMenus = document.querySelectorAll('.dropdown');

if (buttonLeft || buttonRight) {
  buttonRight.addEventListener('click', function (e) {
    carouselDiv.style.scrollBehavior = 'smooth';
    carouselDiv.scrollLeft += 860; // 430 чтоб был шаг в 1 фото , 860 чтоб на 2
  });

  buttonLeft.addEventListener('click', function (e) {
    carouselDiv.style.scrollBehavior = 'smooth';
    carouselDiv.scrollLeft += -860; // 430 чтоб был шаг в 1 фото , 860 чтоб на 2
  });
}
