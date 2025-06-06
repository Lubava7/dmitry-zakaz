Header.render('.insert-header');

const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const carouselDiv = document.getElementById('carousel-div');
const allMenus = document.querySelectorAll('.dropdown');

if (buttonLeft || buttonRight) {
  buttonRight.addEventListener('click', function (e) {
    carouselDiv.style.scrollBehavior = 'smooth';
    carouselDiv.scrollLeft += 430;
  });

  buttonLeft.addEventListener('click', function (e) {
    carouselDiv.style.scrollBehavior = 'smooth';
    carouselDiv.scrollLeft += -430;
  });
}
