console.log('commit version 50 - edited videos and added gifs');
// HEADER
Header.render('.insert-header');

Modal.render();

const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const carouselDiv = document.getElementById('carousel-div');
const allMenus = document.querySelectorAll('.dropdown');
const gap = 10;

// динамически грузим фотки из массива в произвольном порядке
const photoOrder = [
  { type: 'pair', folder: '1', images: ['1.jpg', '2.jpg'] },
  { type: 'single', image: 'Di.jpg' },
  { type: 'pair', folder: '2', images: ['1.jpg', '2.jpg'] },
  { type: 'single', image: 'Diana.jpg' },
  { type: 'pair', folder: '3', images: ['1.jpg', '2.jpg'] },
  { type: 'single', image: 'Eva Pool.jpg' },
  { type: 'pair', folder: '4', images: ['1.jpg', '2.jpg'] },
  { type: 'single', image: 'Eva.jpg' },
  { type: 'pair', folder: '5', images: ['1.jpg', '2.jpg'] },
  { type: 'single', image: 'Natasha.jpg' },
  { type: 'pair', folder: '6', images: ['1.jpg', '2.jpg'] },
  { type: 'single', image: 'Saule.jpg' },
  { type: 'single', image: 'Saule 1.jpg' },
  { type: 'single', image: 'Saule 2.jpg' },
  { type: 'single', image: 'Saule 3.jpg' },
  { type: 'pair', folder: '7', images: ['1.jpg', '2.jpg'] },
  { type: 'pair', folder: '8', images: ['1.jpg', '2.jpg'] },
  { type: 'single', image: 'Vika.jpg' },
];

function isMobile() {
  return window.innerWidth <= 768;
}

function createImageElement(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  // img.loading = 'lazy';
  // img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease';

  img.onload = function () {
    this.style.opacity = '1';
  };

  img.onerror = function () {
    console.warn(`Failed to load: ${this.src}`);
    this.style.display = 'none';
  };

  return img;
}

function loadPhotos() {
  carouselDiv.innerHTML = '';
  photoOrder.forEach((item) => {
    if (item.type === 'pair') {
      const div = document.createElement('div');
      div.className = 'photo-cont two-pics';
      item.images.forEach((imageName) => {
        const img = createImageElement(
          `../images/main/${item.folder}/${imageName}`,
          imageName
        );
        div.appendChild(img);
      });
      carouselDiv.appendChild(div);
    } else if (item.type === 'single') {
      const div = document.createElement('div');
      div.className = 'photo-cont one-pic';
      const img = createImageElement(
        `../images/main/${item.image}`,
        item.image
      );
      div.appendChild(img);
      carouselDiv.appendChild(div);
    }
  });
  console.log('Photos loaded successfully');
  setTimeout(setupInfiniteCarousel, 100);
}

document.addEventListener('DOMContentLoaded', loadPhotos);

// CAROUSEL

if (buttonLeft && buttonRight) {
  function setupInfiniteCarousel() {
    const photoContainers = carouselDiv.querySelectorAll('.photo-cont');

    if (photoContainers.length === 0) return;

    const originalPhotos = Array.from(photoContainers);

    if (!isMobile()) {
      originalPhotos.forEach((photo) => {
        const cloneBefore = photo.cloneNode(true);
        const cloneAfter = photo.cloneNode(true);
        cloneBefore.classList.add('clone');
        cloneAfter.classList.add('clone');
        carouselDiv.insertBefore(cloneBefore, carouselDiv.firstChild);
        carouselDiv.appendChild(cloneAfter);
      });

      const photoWidth = carouselDiv.offsetWidth * 0.5;
      const scrollDistance = (photoWidth + gap) * 2;
      carouselDiv.scrollLeft = scrollDistance * originalPhotos.length;
    }
  }

  setupInfiniteCarousel();

  function snapToNearestPhoto(direction) {
    const photoContainers = carouselDiv.querySelectorAll('.photo-cont');
    const carouselRect = carouselDiv.getBoundingClientRect();
    const carouselCenter = carouselRect.left + carouselRect.width / 2;

    let targetContainer = null;
    let minDistance = Infinity;

    photoContainers.forEach((container) => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const distance = Math.abs(containerCenter - carouselCenter);

      if (distance < minDistance) {
        minDistance = distance;
        targetContainer = container;
      }
    });

    if (!targetContainer) return;

    let targetPhoto = null;

    if (direction === 'right') {
      targetPhoto = targetContainer.nextElementSibling;
      if (!targetPhoto) {
        targetPhoto = carouselDiv.firstElementChild;
      }
    } else {
      targetPhoto = targetContainer.previousElementSibling;
      if (!targetPhoto) {
        targetPhoto = carouselDiv.lastElementChild;
      }
    }

    if (!targetPhoto) return;

    const targetRect = targetPhoto.getBoundingClientRect();
    const carouselScrollLeft = carouselDiv.scrollLeft;

    const targetScrollLeft =
      carouselScrollLeft +
      (targetRect.left - carouselRect.left) +
      targetRect.width / 2 -
      carouselRect.width / 2;

    carouselDiv.style.scrollBehavior = 'smooth';
    carouselDiv.scrollLeft = targetScrollLeft;
  }

  function handleInfiniteScroll() {
    const photoWidth = carouselDiv.offsetWidth * 0.5;
    const scrollDistance = (photoWidth + gap) * 2;
    const originalPhotoCount = photoOrder.length;
    const totalScrollDistance = scrollDistance * originalPhotoCount;
    const maxScrollLeft = carouselDiv.scrollWidth - carouselDiv.clientWidth;

    carouselDiv.style.scrollBehavior = 'auto';

    if (carouselDiv.scrollLeft >= maxScrollLeft - totalScrollDistance) {
      carouselDiv.scrollLeft = carouselDiv.scrollLeft - totalScrollDistance;
    }

    if (carouselDiv.scrollLeft <= totalScrollDistance) {
      carouselDiv.scrollLeft = carouselDiv.scrollLeft + totalScrollDistance;
    }
  }

  let scrollTimeout;
  carouselDiv.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleInfiniteScroll, 50);
  });

  buttonRight.addEventListener('click', function (e) {
    e.preventDefault();
    snapToNearestPhoto('right');
  });

  buttonLeft.addEventListener('click', function (e) {
    e.preventDefault();
    snapToNearestPhoto('left');
  });
}
