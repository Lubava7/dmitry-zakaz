console.log('commit version 12');
// HEADER
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

// PHOTO CAROUSEL
const photos = [
  '../images/example1.jpg',
  '../images/example2.jpg',
  '../images/example3.jpg',
  '../images/flowers.jpg',
  '../images/woman.jpg',
  '../images/example1.jpg',
  '../images/example2.jpg',
  '../images/example3.jpg',
  '../images/flowers.jpg',
  '../images/woman.jpg',
  '../images/example1.jpg',
  '../images/example2.jpg',
  '../images/example3.jpg',
  '../images/flowers.jpg',
  '../images/woman.jpg',
];

let currentPhotoIndex = 0;
const totalPhotos = photos.length;
const visibleThumbnails = 3;

function initializeCarousel() {
  const mainPhotosContainer = document.getElementById('main-photos-container');
  const thumbnailsContainer = document.getElementById('thumbnails');

  photos.forEach((photo, index) => {
    const mainPhotoItem = document.createElement('div');
    mainPhotoItem.className = 'main-photo-item';
    if (index === 0) mainPhotoItem.classList.add('active');

    mainPhotoItem.style.backgroundImage = `url('${photo}')`;

    mainPhotoItem.classList.add('loading');

    const img = new Image();
    img.onload = () => {
      mainPhotoItem.classList.remove('loading');
    };
    img.onerror = () => {
      mainPhotoItem.classList.remove('loading');
      mainPhotoItem.style.backgroundImage = 'none';
      mainPhotoItem.style.backgroundColor = '#555';
      mainPhotoItem.textContent = `Image ${index + 1} failed to load`;
    };
    img.src = photo;

    mainPhotosContainer.appendChild(mainPhotoItem);

    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    if (index === 0) thumbnail.classList.add('active');
    thumbnail.style.backgroundImage = `url('${photo}')`;
    thumbnail.textContent = index + 1;
    thumbnail.onclick = () => goToPhoto(index);

    thumbnail.classList.add('loading');
    const thumbImg = new Image();
    thumbImg.onload = () => {
      thumbnail.classList.remove('loading');
      thumbnail.textContent = '';
    };
    thumbImg.onerror = () => {
      thumbnail.classList.remove('loading');
      thumbnail.style.backgroundImage = 'none';
      thumbnail.style.backgroundColor = '#666';
      thumbnail.textContent = index + 1;
    };
    thumbImg.src = photo;

    thumbnailsContainer.appendChild(thumbnail);
  });
}

function showPhoto(index) {
  const mainPhotos = document.querySelectorAll('.main-photo-item');
  mainPhotos.forEach((photo) => photo.classList.remove('active'));

  if (mainPhotos[index]) {
    mainPhotos[index].classList.add('active');
  }

  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumb) => thumb.classList.remove('active'));

  if (thumbnails[index]) {
    thumbnails[index].classList.add('active');
  }

  updateThumbnailsPosition(index);
}

function updateThumbnailsPosition(index) {
  const thumbnailsContainer = document.getElementById('thumbnails');
  const thumbnailWidth = 90;

  let offset = 0;
  if (index >= Math.floor(visibleThumbnails / 2)) {
    offset = (index - Math.floor(visibleThumbnails / 2)) * thumbnailWidth;

    const maxOffset = Math.max(
      0,
      (totalPhotos - visibleThumbnails) * thumbnailWidth
    );
    if (offset > maxOffset) {
      offset = maxOffset;
    }
  }

  thumbnailsContainer.style.transform = `translateX(-${offset}px)`;
}

function changePhoto(direction) {
  currentPhotoIndex += direction;

  if (currentPhotoIndex >= totalPhotos) {
    currentPhotoIndex = 0;
  } else if (currentPhotoIndex < 0) {
    currentPhotoIndex = totalPhotos - 1;
  }

  showPhoto(currentPhotoIndex);
}

function goToPhoto(index) {
  currentPhotoIndex = index;
  showPhoto(currentPhotoIndex);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeCarousel();
  showPhoto(0);
});

function addPhotos(newPhotos) {
  photos.push(...newPhotos);
  totalPhotos = photos.length;
  initializeCarousel();
  showPhoto(currentPhotoIndex);
}

function removePhoto(index) {
  if (index >= 0 && index < photos.length) {
    photos.splice(index, 1);
    totalPhotos = photos.length;

    if (currentPhotoIndex >= totalPhotos) {
      currentPhotoIndex = totalPhotos - 1;
    }

    initializeCarousel();
    showPhoto(currentPhotoIndex);
  }
}
