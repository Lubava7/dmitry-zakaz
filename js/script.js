console.log('commit version 30');
// HEADER
Header.render('.insert-header');

Modal.render();

const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const carouselDiv = document.getElementById('carousel-div');
const allMenus = document.querySelectorAll('.dropdown');

const gap = 10;

if (buttonLeft && buttonRight) {
  function smoothTransition(targetScrollLeft) {
    carouselDiv.style.transition = 'opacity 0.3s ease-out';
    carouselDiv.style.opacity = '0.3';

    setTimeout(() => {
      carouselDiv.style.scrollBehavior = 'auto';
      carouselDiv.scrollLeft = targetScrollLeft;
      carouselDiv.style.opacity = '1';

      setTimeout(() => {
        carouselDiv.style.scrollBehavior = 'smooth';
        carouselDiv.style.transition = '';
      }, 100);
    }, 300);
  }

  buttonRight.addEventListener('click', function (e) {
    const photoWidth = carouselDiv.offsetWidth * 0.5;
    const scrollDistance = (photoWidth + gap) * 2;
    const maxScrollLeft = carouselDiv.scrollWidth - carouselDiv.clientWidth;

    if (carouselDiv.scrollLeft >= maxScrollLeft - 10) {
      smoothTransition(0);
    } else {
      carouselDiv.style.scrollBehavior = 'smooth';
      carouselDiv.scrollLeft += scrollDistance;
    }
  });

  buttonLeft.addEventListener('click', function (e) {
    const photoWidth = carouselDiv.offsetWidth * 0.5;
    const scrollDistance = (photoWidth + gap) * 2;
    const maxScrollLeft = carouselDiv.scrollWidth - carouselDiv.clientWidth;

    if (carouselDiv.scrollLeft <= 10) {
      smoothTransition(maxScrollLeft);
    } else {
      carouselDiv.style.scrollBehavior = 'smooth';
      carouselDiv.scrollLeft -= scrollDistance;
    }
  });
}
