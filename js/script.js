console.log('commit version 20 - added YT and vimeo support');
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
  'images/example1.jpg',
  'images/example2.jpg',
  'images/example3.jpg',
  'images/flowers.jpg',
  'images/woman.jpg',
  'images/example1.jpg',
  'images/example2.jpg',
  'images/example3.jpg',
  'images/flowers.jpg',
  'images/woman.jpg',
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

    const img = new Image();
    img.src = photo;
    mainPhotosContainer?.appendChild(mainPhotoItem);
  });

  if (
    thumbnailsContainer &&
    window.getComputedStyle(thumbnailsContainer.parentElement).display !==
      'none'
  ) {
    photos.forEach((photo, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      if (index === 0) thumbnail.classList.add('active');
      thumbnail.style.backgroundImage = `url('${photo}')`;
      thumbnail.onclick = () => goToPhoto(index);

      const thumbImg = new Image();
      thumbImg.src = photo;
      thumbnailsContainer?.appendChild(thumbnail);
    });
  }
}

function showPhoto(index) {
  const mainPhotos = document.querySelectorAll('.main-photo-item');
  mainPhotos.forEach((photo) => photo.classList.remove('active'));

  if (mainPhotos[index]) {
    mainPhotos[index].classList.add('active');
  }

  const thumbnailsContainer = document.getElementById('thumbnails');
  if (
    thumbnailsContainer &&
    window.getComputedStyle(thumbnailsContainer.parentElement).display !==
      'none'
  ) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb) => thumb.classList.remove('active'));

    if (thumbnails[index]) {
      thumbnails[index].classList.add('active');
    }

    updateThumbnailsPosition(index);
  }
}

function updateThumbnailsPosition(index) {
  const thumbnailsContainer = document.getElementById('thumbnails');

  if (
    !thumbnailsContainer ||
    window.getComputedStyle(thumbnailsContainer.parentElement).display ===
      'none'
  ) {
    return;
  }

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

// PHOTOS + ONE PHOTO
const films = [];

class FilmCard {
  constructor(url, short_name, short_description, name, description) {
    this.el = document.createElement('div'); //контейнер для данных карточки - корневой дом элемент
    this.el.setAttribute('id', 'film'); //присваиваем id контейнеру

    this.el.onClick = this.navToSinglePage.bind(this);

    this.url = `../images/${url}`;
    this.short_name = short_name;
    this.short_description = short_description;
    this.name = name;
    this.description = description;
    this.el.innerHTML = `
        <img src="${this.url}" />
        <div class="film_layout">
          <h1>${this.short_name}</h1>
          <h1>&#8212;</h1>
          <p>${this.short_description}</p>
        </div>
    `;

    this.render();
  }
  navToSinglePage() {
    // navigate to video.html page with specific id
  }
  render() {
    document.getElementById('films_wrapper')?.appendChild(this.el); // вкладываем карточку в боди в нужный див
    // console.log(this, 'данные фото карточки');
  }
}

new FilmCard(
  'example1.jpg',
  'Saint Laurent',
  'pre fall 2024',
  ' name',
  'description'
);
new FilmCard('example2.jpg', 'Vans', 'spring 2025', ' name', 'description');
new FilmCard('woman.jpg', 'Rimova', 'fall 2024', ' name', 'description');
