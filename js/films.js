// PHOTO CAROUSEL
const photos = [
  '/images/example1.jpg',
  '/images/example2.jpg',
  '/images/example3.jpg',
  '/images/flowers.jpg',
  '/images/woman.jpg',
  '/images/example1.jpg',
  '/images/example2.jpg',
  '/images/example3.jpg',
  '/images/flowers.jpg',
  '/images/woman.jpg',
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
  constructor(id, url, short_name, short_description, name, description) {
    this.el = document.createElement('div'); //контейнер для данных карточки - корневой дом элемент
    this.el.setAttribute('id', 'film'); //присваиваем id контейнеру
    this.el.setAttribute('data-film-id', id);
    this.el.addEventListener('click', this.navToSinglePage.bind(this));

    this.id = id;
    this.url = `/images/${url}`;
    this.short_name = short_name;
    this.short_description = short_description;
    this.name = name;
    this.description = description;

    this.el.innerHTML = `
        <img src="${this.url}" />
        <div class="layout">
          <h1>${this.short_name}</h1>
          <h1>&#8212;</h1>
          <p>${this.short_description}</p>
        </div>
    `;

    this.render();
  }

  navToSinglePage() {
    const params = new URLSearchParams({
      id: this.id,
    });

    window.location.href = `film.html?${params.toString()}`;
  }

  render() {
    const container = document.getElementById('films_wrapper');
    if (container) {
      container.appendChild(this.el);
      films.push(this);

      if (window.imageViewer) {
        window.imageViewer.refreshImageListeners();
      }
    }
  }
}

// Данные фото с уникальными ID
const film_data = [
  {
    id: 'film_1',
    url: 'example1.jpg',
    short_name: 'Saint Laurent',
    short_description: 'pre fall 2024',
    name: 'Saint Laurent Collection',
    description:
      'Detailed description of Saint Laurent pre fall 2024 collection',
  },
  {
    id: 'film_2',
    url: 'example2.jpg',
    short_name: 'Vans',
    short_description: 'spring 2025',
    name: 'Vans Spring Collection',
    description: 'Vans spring 2025 creative campaign showcase',
  },
  {
    id: 'film_3',
    url: 'woman.jpg',
    short_name: 'Rimova',
    short_description: 'fall 2024',
    name: 'Rimova Fall Collection',
    description: 'Rimova fall 2024 fashion photography series',
  },
  {
    id: 'film_4',
    url: 'flowers.jpg',
    short_name: 'Vans',
    short_description: 'spring 2025',
    name: 'Vans Floral Campaign',
    description: 'Vans spring 2025 floral themed campaign',
  },
  {
    id: 'film_5',
    url: 'example3.jpg',
    short_name: 'Rimova',
    short_description: 'fall 2024',
    name: 'Rimova Autumn Series',
    description: 'Rimova fall 2024 artistic photography collection',
  },
];

function createAllFilmCards() {
  film_data.forEach((film) => {
    new FilmCard(
      film.id,
      film.url,
      film.short_name,
      film.short_description,
      film.name,
      film.description
    );
  });
}

createAllFilmCards();

// ONE FILM PAGE (для film.html)
function loadSelectedFilm() {
  const urlParams = new URLSearchParams(window.location.search);
  const filmId = urlParams.get('id');

  const filmData = film_data.find((film) => film.id === filmId);

  if (filmData) {
    displayFilm(filmData);
  } else {
    console.log('Film not found');
  }
}

function displayFilm(filmData) {
  const filmContainer = document.getElementById('single_film_container');

  if (filmContainer) {
    filmContainer.innerHTML = `
      <div class="single_film_wrapper">
        <div class="film_image">
          <img src="/images/${filmData.url}" alt="${filmData.name}" />
        </div>
        
        <div class="film_info">
          <h3 class="film_title">
           <strong>
            ${filmData.name}
           </strong>
          </h3>
          <h2 class="film_subtitle">${filmData.short_name} &#8212; ${filmData.short_description}</h2>
          <p class="film_description">${filmData.description}</p>
        </div>
      </div>
    `;

    if (window.imageViewer) {
      window.imageViewer.refreshImageListeners();
    }
  }
}

// Запускаем функцию загрузки при загрузке страницы film.html
document.addEventListener('DOMContentLoaded', loadSelectedFilm);
