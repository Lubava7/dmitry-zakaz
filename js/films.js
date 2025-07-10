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
    img.setAttribute('loading', 'lazy');
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

let photos = [];
let currentPhotoIndex = 0;
let totalPhotos = photos.length;
const visibleThumbnails = 3;
let thumbnailOffset = 0;

function initializeCarousel() {
  const mainPhotosContainer = document.getElementById('main-photos-container');
  const thumbnailsContainer = document.getElementById('thumbnails');

  if (mainPhotosContainer) {
    mainPhotosContainer.innerHTML = '';
    mainPhotosContainer.style.display = 'flex';
    // mainPhotosContainer.style.gap = '20px';
    // mainPhotosContainer.style.width = `calc(${photos.length * 100}% + 20px)`;
    mainPhotosContainer.style.width = `${photos.length * 100}%`;
    mainPhotosContainer.style.transition = 'transform 0.5s ease-in-out';
    mainPhotosContainer.style.transform = 'translateX(0%)';
  }

  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = '';
  }

  photos.forEach((photo, index) => {
    const mainPhotoItem = document.createElement('div');
    mainPhotoItem.className = 'main-photo-item';
    // mainPhotoItem.style.width = `calc((100% / ${photos.length}) - 20px)`;
    mainPhotoItem.style.width = `calc(100% / ${photos.length})`;
    mainPhotoItem.style.flexShrink = '0';

    const img = document.createElement('img');
    img.src = photo;
    img.alt = `Photo ${index + 1}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    img.setAttribute('loading', 'lazy');

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
      thumbImg.setAttribute('loading', 'lazy');
    });
  }

  if (window.imageViewer) {
    setTimeout(() => {
      window.imageViewer.refreshImageListeners();
    }, 100);
  }
}

function showPhoto(index) {
  const mainPhotosContainer = document.getElementById('main-photos-container');
  if (mainPhotosContainer) {
    const translateValue = -(index * (100 / photos.length));
    mainPhotosContainer.style.transform = `translateX(${translateValue}%)`;
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

  const thumbnailWidth = window.innerWidth * 0.06 + window.innerWidth * 0.006;
  let offset = index * thumbnailWidth;

  if (index >= totalPhotos - visibleThumbnails) {
    const remaining = totalPhotos - index;
    const needed = visibleThumbnails - remaining;
    offset = index * thumbnailWidth;
  }

  thumbnailOffset = offset;
  thumbnailsContainer.style.transform = `translateX(-${offset}px)`;
  thumbnailsContainer.style.transition = 'transform 0.3s ease';
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
  thumbnailOffset = 0;
  initializeCarousel();
  showPhoto(0);
}

function addInfiniteScrollListeners() {
  const thumbnailsContainer = document.getElementById('thumbnails');
  if (!thumbnailsContainer) return;

  thumbnailsContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    changePhoto(direction);
  });

  let touchStartY = 0;
  thumbnailsContainer.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });

  thumbnailsContainer.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) > 30) {
      const direction = deltaY > 0 ? 1 : -1;
      changePhoto(direction);
      touchStartY = touchEndY;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeCarousel();
  showPhoto(0);
  addInfiniteScrollListeners();
});

function addPhotos(newPhotos) {
  photos.push(...newPhotos);
  totalPhotos = photos.length;
  initializeCarousel();
  showPhoto(currentPhotoIndex);
  addInfiniteScrollListeners();
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
    addInfiniteScrollListeners();
  }
}

const films = [];

class FilmCard {
  constructor(id, url, short_name, short_description, name, description) {
    this.el = document.createElement('div');
    this.el.setAttribute('id', 'film');
    this.el.setAttribute('data-film-id', id);
    this.el.addEventListener('click', this.navToSinglePage.bind(this));

    this.id = id;
    this.url = `../images/${url}`;
    this.short_name = short_name;
    this.short_description = short_description;
    this.name = name;
    this.description = description;

    this.el.innerHTML = `
            <img src="${this.url}" loading="lazy"/>
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

const film_data = [
  {
    id: 'high',
    url: 'projects/high/99.jpg',
    short_name: 'MAYOT - High',
    short_description: 'Fontana Visual 2024',
    name: 'Fontanka Visual 2024',
  },
  {
    id: 'done',
    url: 'projects/done/1.jpg',
    short_name: 'UNEEK - DONE',
    short_description: 'Rolling Loud 2024',
    name: 'Rolling Loud 2024',
  },
  {
    id: 'PAKET',
    url: 'projects/PAKET/cover.jpg',
    short_name: 'PAKET NETWORK',
    short_description: 'SS24',
    name: 'SS24',
  },
  {
    id: 'smozhem',
    url: 'projects/smozhem/1.jpg',
    short_name: 'MAYOT – Сможем ли Мы',
    short_description: 'August 2023',
    name: 'August 2023',
  },
  {
    id: 'Moscow',
    url: 'projects/Moscow/1.jpg',
    short_name: 'MOSCOW STREETS',
    short_description: '2022',
    name: '2022',
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

      if (projectImages.length > 0) {
        updateCarouselPhotos(projectImages);
      } else {
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

    if (window.imageViewer) {
      setTimeout(() => {
        window.imageViewer.refreshImageListeners();
      }, 500);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadSelectedFilm);
