const template = document.createElement('template');
let html = `
<nav class="header">

<div class="dropdown">
  <a href="#" class="a">film</a>
</div>

<div class="dropdown">
  <a href="#" class="a">videos</a>
</div>

<div class="dropdown">
  <a href="#" class="a">about me</a>
</div>

  <a href="#" class="a-img-logo "><img src="https://raw.githubusercontent.com/Lubava7/dmitry-zakaz/8b81e1ef6ee2abc968bd2ff0c0fc47ab600e4198/logo.svg"/></a>
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
