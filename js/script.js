console.log('commit version 46 - edited files for hosting');
// HEADER
Header.render('.insert-header');

Modal.render();

const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const carouselDiv = document.getElementById('carousel-div');
const allMenus = document.querySelectorAll('.dropdown');
const gap = 10;

// динамически грузим фотки из папок
const photoData = {
  twoPicFolders: [
    { folder: '1', images: ['1.jpg', '2.jpg'] },
    { folder: '2', images: ['1.jpg', '2.jpg'] },
    { folder: '3', images: ['1.jpg', '2.jpg'] },
    { folder: '4', images: ['1.jpg', '2.jpg'] },
    { folder: '5', images: ['1.jpg', '2.jpg'] },
    { folder: '6', images: ['1.jpg', '2.jpg'] },
    { folder: '7', images: ['1.jpg', '2.jpg'] },
    { folder: '8', images: ['1.jpg', '2.jpg'] },
  ],

  singlePhotos: [
    'Di.jpg',
    'Diana.jpg',
    'Eva Pool.jpg',
    'Eva.jpg',
    'Natasha.jpg',
    'Saule 1.jpg',
    'Saule 2.jpg',
    'Saule 3.jpg',
    'Vika.jpg',
  ],
};

function createImageElement(src, alt) {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  img.style.opacity = '0';
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

  const twoPicDivs = [];
  const onePicDivs = [];

  photoData.twoPicFolders.forEach((folder) => {
    const div = document.createElement('div');
    div.className = 'photo-cont two-pics';

    folder.images.forEach((imageName) => {
      const img = createImageElement(
        `images/main/${folder.folder}/${imageName}`,
        imageName
      );
      div.appendChild(img);
    });

    twoPicDivs.push(div);
  });

  photoData.singlePhotos.forEach((photoName) => {
    const div = document.createElement('div');
    div.className = 'photo-cont one-pic';

    const img = createImageElement(`images/main/${photoName}`, photoName);
    div.appendChild(img);

    onePicDivs.push(div);
  });

  const maxLength = Math.max(twoPicDivs.length, onePicDivs.length);
  let twoPicIndex = 0;
  let onePicIndex = 0;

  for (let i = 0; i < maxLength * 2; i++) {
    if (i % 2 === 0) {
      if (twoPicIndex < twoPicDivs.length) {
        carouselDiv.appendChild(twoPicDivs[twoPicIndex]);
        twoPicIndex++;
      }
    } else {
      if (onePicIndex < onePicDivs.length) {
        carouselDiv.appendChild(onePicDivs[onePicIndex]);
        onePicIndex++;
      }
    }
  }

  while (twoPicIndex < twoPicDivs.length) {
    carouselDiv.appendChild(twoPicDivs[twoPicIndex]);
    twoPicIndex++;
  }
  while (onePicIndex < onePicDivs.length) {
    carouselDiv.appendChild(onePicDivs[onePicIndex]);
    onePicIndex++;
  }

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
