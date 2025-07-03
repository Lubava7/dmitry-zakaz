const template = document.createElement('template');

const isInSubdir = window.location.pathname.includes('/pages/');
const basePath = isInSubdir ? '../pages/' : 'pages/';

let html = `
<nav class="header">

<div class="dropdown">
  <a href="../index.html" class="a">portfolio</a>
</div>

<div class="dropdown">
  <a href="${basePath}films.html" class="a">projects</a>
</div>

<div class="dropdown">
  <a href="${basePath}videos.html" class="a">videos</a>
</div>

<div class="dropdown">
  <a href="${basePath}about.html" class="a">about me</a>
</div>

</nav>
  `;

html = html.trim();
template.innerHTML = html;
const headerNode = template.content.firstChild;

class Header {
  static render(query) {
    const node = document.querySelector(query);

    document.body.insertBefore(headerNode, node);
  }
}
window.customElements.define('header-comp', Header);
