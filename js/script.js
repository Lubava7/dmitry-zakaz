Header.render(".instert-header");

const buttonLeft = document.getElementById("button-left");
const buttonRight = document.getElementById("button-right");
const carouselDiv = document.getElementById("carousel-div");
const allMenus = document.querySelectorAll(".dropdown");

if (buttonLeft || buttonRight) {
  buttonRight.addEventListener("click", function (e) {
    carouselDiv.style.scrollBehavior = "smooth";
    carouselDiv.scrollLeft += 430;
  });

  buttonLeft.addEventListener("click", function (e) {
    carouselDiv.style.scrollBehavior = "smooth";
    carouselDiv.scrollLeft += -430;
  });
}

allMenus.forEach((menu) => {
  const a = menu.querySelector(".a");
  const oneMenu = menu.querySelector(".dropdown-menu");
  const gradient = document.querySelector(".gradient-none");
  const nav = document.querySelector("nav");
  a.addEventListener("mouseover", (e) => {
    oneMenu.style.opacity = "1";
    oneMenu.style.display = "flex";
    gradient.style.opacity = "1";
  });
  a.addEventListener("mouseout", (e) => {
    oneMenu.style.opacity = "0";
    gradient.style.opacity = "0";
    oneMenu.style.display = "none";
  });
  nav.addEventListener("mouseout", (e) => {
    oneMenu.style.opacity = "0";
    gradient.style.opacity = "0";
    oneMenu.style.display = "none";
  });
  oneMenu.addEventListener("mouseout", (e) => {
    oneMenu.style.opacity = "0";
    gradient.style.opacity = "0";
    oneMenu.style.display = "none";
  });
  oneMenu.addEventListener("mouseover", (e) => {
    oneMenu.style.opacity = "1";
    oneMenu.style.display = "flex";
    gradient.style.opacity = "1";
  });
});
