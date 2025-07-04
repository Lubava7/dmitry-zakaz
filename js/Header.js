const template = document.createElement('template');

const isInSubdir = window.location.pathname.includes('/');
const basePath = isInSubdir ? '../../' : '../';

let html = `
   <div class="main_heading">
    <a id="heading" href="../portfolio">DIMA ZIMNICKIY</a>
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
   </div>
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
