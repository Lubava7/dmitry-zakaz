console.log('commit version 22 - edited scroll on main page');
// HEADER
Header.render('.insert-header');
Modal.render();

const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const carouselDiv = document.getElementById('carousel-div');
// const photoContainer = document.getElementById('photo-cont');
const allMenus = document.querySelectorAll('.dropdown');

const gap = 10;

if (buttonLeft || buttonRight) {
  buttonRight.addEventListener('click', function (e) {
    carouselDiv.style.scrollBehavior = 'smooth';
    const photoWidth = carouselDiv.offsetWidth * 0.5;

    const scrollDistance = (photoWidth + gap) * 2;
    carouselDiv.scrollLeft += scrollDistance;
  });

  buttonLeft.addEventListener('click', function (e) {
    carouselDiv.style.scrollBehavior = 'smooth';
    const photoWidth = carouselDiv.offsetWidth * 0.5;

    const scrollDistance = (photoWidth + gap) * -2;
    carouselDiv.scrollLeft += scrollDistance;
  });
}
