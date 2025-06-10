const modalTemplate = document.createElement('template');
let modalHtml = `
<div id="imageModal" class="image-modal">
  <div class="close-modal" id="closeModal"><span>&#10005;</span></div>
  
  <div class="modal-content" id="modalContent">
    <img id="modalImage" class="modal-image" src="" alt="" />
  </div>

  <div class="zoom-controls">
    <button class="zoom-btn" id="zoomOut">−</button>
    <div class="zoom-info" id="zoomInfo">100%</div>
    <button class="zoom-btn" id="zoomIn">+</button>
    <button class="zoom-btn" id="resetZoom">⌂</button>
  </div>
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
    this.zoomInBtn = document.getElementById('zoomIn');
    this.zoomOutBtn = document.getElementById('zoomOut');
    this.resetZoomBtn = document.getElementById('resetZoom');
    this.zoomInfo = document.getElementById('zoomInfo');
    this.modalContent = document.getElementById('modalContent');

    this.scale = 1;
    this.maxScale = 5;
    this.minScale = 0.5;
    this.scaleStep = 0.2;

    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.imagePosition = { x: 0, y: 0 };

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

    this.zoomInBtn?.addEventListener('click', () => this.zoomIn());
    this.zoomOutBtn?.addEventListener('click', () => this.zoomOut());
    this.resetZoomBtn?.addEventListener('click', () => this.resetZoom());

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

    this.modalImage.src = clickedImage.src;
    this.modalImage.alt = clickedImage.alt;
    this.modal.classList.add('active');
    this.resetZoom();
    document.body.style.overflow = 'hidden';
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
      case '+':
      case '=':
        this.zoomIn();
        break;
      case '-':
        this.zoomOut();
        break;
      case '0':
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

    if (this.zoomInfo) {
      this.zoomInfo.textContent = `${Math.round(this.scale * 100)}%`;
    }

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

document.addEventListener('DOMContentLoaded', () => {
  Modal.render();

  setTimeout(() => {
    window.imageViewer = new ImageModalViewer();
  }, 100);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.imageViewer) {
      Modal.render();
      setTimeout(() => {
        window.imageViewer = new ImageModalViewer();
      }, 100);
    }
  });
} else {
  if (!window.imageViewer) {
    Modal.render();
    setTimeout(() => {
      window.imageViewer = new ImageModalViewer();
    }, 100);
  }
}
