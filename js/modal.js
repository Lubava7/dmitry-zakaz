const modalTemplate = document.createElement('template');
let modalHtml = `
<div id="imageModal" class="image-modal">
  <div class="modal_icon close-modal" id="closeModal"><span>&#10005;</span></div>
  
  <div class="modal-content" id="modalContent">
    <img id="modalImage" class="modal-image" src="" alt="" />
    <div class="image-counter" id="imageCounter">1 / 1</div>
  </div>

  <div class="modal_icon nav-arrow nav-prev scroll-circle-modal" id="prevImage"></div>
  <div class="modal_icon nav-arrow nav-next scroll-circle-modal" id="nextImage"></div>
</div>
`;

modalHtml = modalHtml.trim();
modalTemplate.innerHTML = modalHtml;
const modalNode = modalTemplate.content.firstChild;

class Modal {
  static render() {
    if (!document.getElementById('imageModal')) {
      document.body.appendChild(modalNode);
    }
  }
}

window.customElements.define('modal-comp', Modal);

class ImageModalViewer {
  constructor() {
    this.modal = document.getElementById('imageModal');
    this.modalImage = document.getElementById('modalImage');
    this.closeBtn = document.getElementById('closeModal');
    this.modalContent = document.getElementById('modalContent');
    this.prevBtn = document.getElementById('prevImage');
    this.nextBtn = document.getElementById('nextImage');
    this.imageCounter = document.getElementById('imageCounter');

    this.scale = 1;
    this.maxScale = 5;
    this.minScale = 0.5;
    this.scaleStep = 0.2;

    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.imagePosition = { x: 0, y: 0 };

    this.images = [];
    this.currentImageIndex = 0;

    this.init();
  }

  init() {
    if (!this.modal) {
      return;
    }

    this.addImageListeners();

    this.closeBtn?.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    this.prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showPrevImage();
    });
    this.nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showNextImage();
    });

    this.modalImage?.addEventListener('wheel', (e) => this.handleWheel(e));

    this.modalImage?.addEventListener('mousedown', (e) => this.startDrag(e));
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.stopDrag());

    this.modalImage?.addEventListener('touchstart', (e) => this.startDrag(e));
    document.addEventListener('touchmove', (e) => this.drag(e));
    document.addEventListener('touchend', () => this.stopDrag());

    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    this.modalImage?.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  addImageListeners() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.hasAttribute('data-modal-listener')) {
        img.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openModal(e);
        });
        img.setAttribute('data-modal-listener', 'true');
        img.style.cursor = 'pointer';
      }
    });
  }

  openModal(event) {
    const clickedImage = event.target;

    if (clickedImage === this.modalImage || !this.modal) return;

    // Get all images that have modal listeners
    this.images = Array.from(document.querySelectorAll('img')).filter(
      (img) =>
        img.hasAttribute('data-modal-listener') && img !== this.modalImage
    );

    this.currentImageIndex = this.images.indexOf(clickedImage);

    this.showCurrentImage();
    this.modal.classList.add('active');
    this.resetZoom();
    document.body.style.overflow = 'hidden';
    this.updateNavButtons();
    this.updateImageCounter();
  }

  showCurrentImage() {
    if (this.images[this.currentImageIndex]) {
      this.modalImage.src = this.images[this.currentImageIndex].src;
      this.modalImage.alt = this.images[this.currentImageIndex].alt;
    }
  }

  showPrevImage() {
    if (this.images.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex > 0
          ? this.currentImageIndex - 1
          : this.images.length - 1;
      this.showCurrentImage();
      this.resetZoom();
      this.updateNavButtons();
      this.updateImageCounter();

      // Update carousel if we're on film page
      this.syncWithCarousel();
    }
  }

  showNextImage() {
    if (this.images.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex < this.images.length - 1
          ? this.currentImageIndex + 1
          : 0;
      this.showCurrentImage();
      this.resetZoom();
      this.updateNavButtons();
      this.updateImageCounter();

      // Update carousel if we're on film page
      this.syncWithCarousel();
    }
  }

  syncWithCarousel() {
    // Check if we're on a page with carousel functions
    if (typeof goToPhoto === 'function' && typeof photos !== 'undefined') {
      const currentImageSrc = this.images[this.currentImageIndex].src;
      const carouselIndex = photos.findIndex((photo) => {
        // Handle relative path differences
        const photoPath = photo.replace('../', '');
        const imagePath = currentImageSrc.split('/').slice(-2).join('/');
        return photoPath.includes(imagePath) || imagePath.includes(photoPath);
      });

      if (carouselIndex !== -1 && carouselIndex !== currentPhotoIndex) {
        goToPhoto(carouselIndex);
      }
    }
  }

  updateNavButtons() {
    if (!this.prevBtn || !this.nextBtn) return;

    if (this.images.length <= 1) {
      this.prevBtn.style.display = 'none';
      this.nextBtn.style.display = 'none';
    } else {
      this.prevBtn.style.display = 'flex';
      this.nextBtn.style.display = 'flex';
    }
  }

  updateImageCounter() {
    if (this.imageCounter) {
      this.imageCounter.textContent = `${this.currentImageIndex + 1} / ${
        this.images.length
      }`;
      this.imageCounter.style.display =
        this.images.length > 1 ? 'block' : 'none';
    }
  }

  closeModal() {
    if (!this.modal) return;

    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.resetZoom();
  }

  zoomIn() {
    if (this.scale < this.maxScale) {
      this.scale += this.scaleStep;
      this.updateImageTransform(true);
    }
  }

  zoomOut() {
    if (this.scale > this.minScale) {
      this.scale -= this.scaleStep;
      this.updateImageTransform(true);
    }
  }

  resetZoom() {
    this.scale = 1;
    this.imagePosition = { x: 0, y: 0 };
    this.updateImageTransform(true);
    this.modalImage?.classList.remove('zoomed');
  }

  handleWheel(event) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -this.scaleStep : this.scaleStep;
    const newScale = Math.max(
      this.minScale,
      Math.min(this.maxScale, this.scale + delta)
    );

    if (newScale !== this.scale) {
      this.scale = newScale;
      this.updateImageTransform(true);
    }
  }

  startDrag(event) {
    if (this.scale > 1) {
      this.isDragging = true;

      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      this.dragStart = {
        x: clientX - this.imagePosition.x,
        y: clientY - this.imagePosition.y,
      };

      this.modalImage?.classList.add('dragging');

      event.preventDefault();
    }
  }

  drag(event) {
    if (this.isDragging && this.scale > 1) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      this.imagePosition = {
        x: clientX - this.dragStart.x,
        y: clientY - this.dragStart.y,
      };

      this.updateImageTransform(false);
      event.preventDefault();
    }
  }

  stopDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      this.modalImage?.classList.remove('dragging');
    }
  }

  handleKeydown(event) {
    if (!this.modal?.classList.contains('active')) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.showPrevImage();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.showNextImage();
        break;
      case '+':
      case '=':
        event.preventDefault();
        this.zoomIn();
        break;
      case '-':
        event.preventDefault();
        this.zoomOut();
        break;
      case '0':
        event.preventDefault();
        this.resetZoom();
        break;
    }
  }

  updateImageTransform(useTransition = false) {
    if (!this.modalImage) return;

    if (useTransition && !this.isDragging) {
      this.modalImage.classList.add('zoom-transition');
    } else {
      this.modalImage.classList.remove('zoom-transition');
    }

    const transform = `scale(${this.scale}) translate(${
      this.imagePosition.x / this.scale
    }px, ${this.imagePosition.y / this.scale}px)`;

    this.modalImage.style.transform = transform;

    if (this.scale > 1) {
      this.modalImage.classList.add('zoomed');
    } else {
      this.modalImage.classList.remove('zoomed');
    }

    if (useTransition && !this.isDragging) {
      setTimeout(() => {
        this.modalImage?.classList.remove('zoom-transition');
      }, 200);
    }
  }

  refreshImageListeners() {
    this.addImageListeners();
  }
}

// Initialize modal on appropriate screen sizes
let modalInitialized = false;

function checkScreenSize() {
  const isMobile = window.innerWidth <= 768;

  if (!isMobile && !modalInitialized) {
    Modal.render();
    setTimeout(() => {
      if (!window.imageViewer) {
        window.imageViewer = new ImageModalViewer();
      }
    }, 100);
    modalInitialized = true;
  } else if (isMobile && modalInitialized) {
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.remove();
    }
    window.imageViewer = null;
    modalInitialized = false;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });
} else {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
}
