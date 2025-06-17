console.log('commit version 39 - edited modal arrows');
// HEADER
Header.render('.insert-header');

Modal.render();

const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const carouselDiv = document.getElementById('carousel-div');
const allMenus = document.querySelectorAll('.dropdown');

const gap = 10;

if (buttonLeft && buttonRight) {
  function setupInfiniteCarousel() {
    const photoContainers = carouselDiv.querySelectorAll('.photo-cont');

    if (photoContainers.length === 0) return;

    const firstClone = photoContainers[0].cloneNode(true);
    const lastClone =
      photoContainers[photoContainers.length - 1].cloneNode(true);

    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    carouselDiv.appendChild(firstClone);
    carouselDiv.insertBefore(lastClone, photoContainers[0]);

    const photoWidth = carouselDiv.offsetWidth * 0.5;
    const scrollDistance = (photoWidth + gap) * 2;
    carouselDiv.scrollLeft = scrollDistance;
  }

  setupInfiniteCarousel();

  function handleInfiniteScroll() {
    const photoWidth = carouselDiv.offsetWidth * 0.5;
    const scrollDistance = (photoWidth + gap) * 2;
    const maxScrollLeft = carouselDiv.scrollWidth - carouselDiv.clientWidth;

    if (carouselDiv.scrollLeft >= maxScrollLeft - 5) {
      carouselDiv.style.scrollBehavior = 'auto';
      carouselDiv.scrollLeft = scrollDistance;
      setTimeout(() => {
        carouselDiv.style.scrollBehavior = 'smooth';
      }, 10);
    }

    if (carouselDiv.scrollLeft <= 5) {
      carouselDiv.style.scrollBehavior = 'auto';
      carouselDiv.scrollLeft = maxScrollLeft - scrollDistance;
      setTimeout(() => {
        carouselDiv.style.scrollBehavior = 'smooth';
      }, 10);
    }
  }

  let scrollTimeout;
  carouselDiv.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleInfiniteScroll, 100);
  });

  buttonRight.addEventListener('click', function (e) {
    const photoWidth = carouselDiv.offsetWidth * 0.5;
    const scrollDistance = (photoWidth + gap) * 2;

    carouselDiv.style.scrollBehavior = 'smooth';
    carouselDiv.scrollLeft += scrollDistance;
  });

  buttonLeft.addEventListener('click', function (e) {
    const photoWidth = carouselDiv.offsetWidth * 0.5;
    const scrollDistance = (photoWidth + gap) * 2;

    carouselDiv.style.scrollBehavior = 'smooth';
    carouselDiv.scrollLeft -= scrollDistance;
  });
}
