const template = document.createElement("template");
let html = `
<nav class="header">
<div class="dropdown">
  <a href="testPage.html" class="a">portfolio</a>
  <div class="dropdown-menu">
    <a href="#">b&w</a>
    <a href="#">portraits</a>
    <a href="#" class="menu-line"></a>
  </div>
</div>

  <div class="dropdown">
    <a href="#" class="a">film</a>
    <div class="dropdown-menu">
      <a href="#">b&w</a>
      <a href="#">portraits</a>
      <a href="#" class="menu-line"></a>
    </div>
  </div>

<div class="dropdown">
  <a href="#" class="a">digital</a>
  <div class="dropdown-menu">
    <a href="pages/blackWhite/blackWhite.html">b&w</a>
    <a href="../pages/color/color.html">color</a>
    <a href="../pages/portraits/portraits.html">portraits</a>
    <a href="#" class="menu-line"></a>
  </div>
</div>

  <div class="dropdown">
    <a href="#" class="a">food</a>
    <div class="dropdown-menu">
      <a href="#">b&w</a>
    <a href="#">portraits</a>
    <a href="#" class="menu-line"></a>
    </div>
  </div>

<div class="dropdown">
  <a href="#" class="a">videos</a>
  <div class="dropdown-menu">
    <a href="#">b&w</a>
    <a href="#">portraits</a>
    <a href="#"class="menu-line"></a>
  </div>
</div>

<div class="dropdown">
  <a href="#" class="a">about me</a>
  <div class="dropdown-menu">
    <a href="#">b&w</a>
    <a href="#">portraits</a>
    <a  href="#"class="menu-line"></a>
  </div>
</div>

  <a href="#" class="a-img-logo "><img src="images/logo.svg"/></a>
  </nav>
  `;

html = html.trim();

template.innerHTML = html;

const headerNode = template.content.firstChild;

// class Header extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//     // this.shadowRoot.appendChild(template.content.cloneNode(true));
//   }

// }

class Header {
  static render(query) {
    const node = document.querySelector(query);

    document.body.insertBefore(headerNode, node);
  }
}
window.customElements.define("header-comp", Header);
