const isInPicSubdir = window.location.pathname.includes('/images/');
const basePicPath = isInPicSubdir
  ? '../images/projects/'
  : '../images/projects/';

function imageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function scanProjectImages(projectId) {
  const manifestUrl = `${basePicPath}${projectId}/manifest.json`;
  try {
    const response = await fetch(manifestUrl);
    if (!response.ok) throw new Error('Manifest not found');
    const imageFiles = await response.json();
    const images = imageFiles.map(
      (filename) => `${basePicPath}${projectId}/${filename}`
    );
    return images;
  } catch (e) {
    console.warn('Manifest not found, falling back to empty image list', e);
    return [];
  }
}

// PHOTO CAROUSEL
let photos = [];

let currentPhotoIndex = 0;
let totalPhotos = photos.length;
const visibleThumbnails = 3;

function initializeCarousel() {
  const mainPhotosContainer = document.getElementById('main-photos-container');
  const thumbnailsContainer = document.getElementById('thumbnails');

  if (mainPhotosContainer) {
    mainPhotosContainer.innerHTML = '';
  }
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = '';
  }

  photos.forEach((photo, index) => {
    const mainPhotoItem = document.createElement('div');
    mainPhotoItem.className = 'main-photo-item';
    if (index === 0) mainPhotoItem.classList.add('active');

    const img = document.createElement('img');
    img.src = photo;
    img.alt = `Photo ${index + 1}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';

    mainPhotoItem.appendChild(img);
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

  if (window.imageViewer) {
    setTimeout(() => {
      window.imageViewer.refreshImageListeners();
    }, 100);
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

function updateCarouselPhotos(newPhotos) {
  photos = [...newPhotos];
  totalPhotos = photos.length;
  currentPhotoIndex = 0;
  initializeCarousel();
  showPhoto(0);
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
    this.url = `../images/${url}`;
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

    window.location.href = `../film/?${params.toString()}`;
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
    id: 'film_1', // айди проекта - название проекта в папке images/projects
    url: 'projects/film_1/1.jpg', // фото которое будет видно в списке фото
    short_name: 'MAYOT', // подпись к фото при наведении
    short_description: 'Сможем ли мы', // подпись к фото при наведении
    name: 'Сможем ли мы', // подпись к фото при наведении
    description:
      'Detailed description of Saint Laurent pre fall 2024 collection', // описание к фото
  },

  {
    id: 'film_1', // айди проекта - название проекта в папке images/projects
    url: 'projects/film_1/1.jpg', // фото которое будет видно в списке фото
    short_name: 'MAYOT', // подпись к фото при наведении
    short_description: 'Сможем ли мы', // подпись к фото при наведении
    name: 'Сможем ли мы', // подпись к фото при наведении
    description:
      'Detailed description of Saint Laurent pre fall 2024 collection', // описание к фото
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

async function displayFilm(filmData) {
  const filmContainer = document.getElementById('single_film_container');

  if (filmContainer) {
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = 'Loading images...';
    loadingDiv.style.textAlign = 'center';
    loadingDiv.style.padding = '20px';
    filmContainer.appendChild(loadingDiv);

    try {
      const projectImages = await scanProjectImages(filmData.id);
      console.log('projectImages', projectImages);

      if (projectImages.length > 0) {
        console.log(`Found ${projectImages.length} images for ${filmData.id}`);
        updateCarouselPhotos(projectImages);
      } else {
        console.log(
          `No dynamic images found for ${filmData.id}, using fallback`
        );
        const fallbackImages = [
          '../images/example4.jpg',
          '../images/example5.jpg',
          '../images/example6.jpg',
          '../images/example7.jpg',
          '../images/example8.jpg',
        ];
        updateCarouselPhotos(fallbackImages);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      const fallbackImages = [
        '../images/example4.jpg',
        '../images/example5.jpg',
        '../images/example6.jpg',
        '../images/example7.jpg',
        '../images/example8.jpg',
      ];
      updateCarouselPhotos(fallbackImages);
    }

    if (loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }

    // Ensure modal listeners are added after images are loaded
    if (window.imageViewer) {
      setTimeout(() => {
        window.imageViewer.refreshImageListeners();
      }, 500);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadSelectedFilm);
