const template = document.createElement('template');

const isInSubdir = window.location.pathname.includes('/');
const basePath = isInSubdir ? '../../' : '../';

let html = `
   <div class="main_heading" id="mainHeading">

     <div class="mobile-header">
    <a id="heading" href="../portfolio">DIMA ZIMNICKIY</a>
              <div class="burger-menu" id="burgerMenu">
                  <span></span>
                  <span></span>
              </div>
          </div>

     <!-- Desktop navigation -->
    <nav class="header">
      <div class="dropdown">
        <a href="${basePath}portfolio/" class="a">portfolio</a>
      </div>

      <div class="dropdown">
        <a href="${basePath}films/" class="a">projects</a>
      </div>

     <div class="dropdown">
        <a href="${basePath}videos/" class="a">videos</a>
     </div>

      <div class="dropdown">
        <a href="${basePath}about/" class="a">about me</a>
      </div>
    </nav>



      <!-- Mobile burger menu -->
        <div>
        
               
        <div class="overlay" id="overlay"></div>
               
        <div class="mobile-menu" id="mobileMenu">
                   <div class="mobile-menu-content">
                       <a href="${basePath}portfolio/">portfolio</a>
                       <a href="${basePath}films/">projects</a>
                       <a href="${basePath}videos/">videos</a>
                       <a href="${basePath}about/">about me</a>
                   </div>
               </div>
             </div>
      
  `;

html = html.trim();
template.innerHTML = html;
const headerNode = template.content.firstChild;

class Header {
  static render(query) {
    const node = document.querySelector(query);
    document.body.insertBefore(headerNode, node);

    requestAnimationFrame(() => {
      this.initMobileMenu();
    });
  }

  static initMobileMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const mainHeading = document.getElementById('mainHeading');

    console.log('burgerMenu', burgerMenu);
    console.log('mobileMenu', mobileMenu);
    console.log('overlay', overlay);

    function toggleMenu() {
      burgerMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      mainHeading.classList.toggle('active');
    }

    function closeMenu() {
      burgerMenu.classList.remove('active');
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      mainHeading.classList.remove('active');
    }

    burgerMenu.addEventListener('click', (e) => {
      toggleMenu();
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
        closeMenu();
      }
    });

    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }
}
window.customElements.define('header-comp', Header);
