const template = document.createElement('template');
let html = `
<nav class="header">

<div class="dropdown">
  <a href="./film.html" class="a">film</a>
</div>

<div class="dropdown">
  <a href="./video.html" class="a">videos</a>
</div>

<div class="dropdown">
  <a href="./about.html" class="a">about me</a>
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
