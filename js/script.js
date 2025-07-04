console.log('commit version 47 - edited pages and added "pretty url"');
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

  // загружаем после загрузки фоток
  // setTimeout(setupInfiniteCarousel, 50);
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
