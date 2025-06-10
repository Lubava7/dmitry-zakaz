const template = document.createElement('template');
let html = `
<nav class="header">
<div class="dropdown">
  <a href="../pages/films.html" class="a">film</a>
</div>

<div class="dropdown">
  <a href="../pages/videos.html" class="a">videos</a>
</div>

<div class="dropdown">
  <a href="../pages/about.html" class="a">about</a>
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
