const mediaQ = window.matchMedia("screen and (min-width: 1326px)");
const mediaQMiddle = window.matchMedia(
  "(max-width: 1325px) and (min-width: 680px)"
);
const mediaQMin = window.matchMedia(
  "(max-width: 679px) and (min-width: 300px)"
);
const navBtn = document.querySelector("#guide_menu_btn");
const navContainer = document.querySelector(".guide-container");
const page = document.querySelector(".page-manager");
const modalWrap = document.createElement("div");
const modal = document.createElement("div");

modalWrap.classList.add("modal-wrap");
modalWrap.append(modal);
document.body.prepend(modalWrap);

if (window.location.pathname.includes("videos")) {
  navContainer.classList.add("close");
  page.classList.add("close");
}

const handleNavBtn = (e) => {
  // mini toggle
  if (mediaQ.matches) {
    navBtn.classList.remove("close");
    navContainer.classList.toggle("mini");
    page.classList.toggle("mini");
  }

  // mini as default.
  if (mediaQMiddle.matches) {
    navContainer.classList.toggle("mini");
    navContainer.classList.toggle("modal");
    modalWrap.classList.toggle("show");
    if (modalWrap.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    }
  }

  // close as default
  if (mediaQMin.matches || window.location.pathname.includes("videos")) {
    navContainer.classList.toggle("close");
    navContainer.classList.toggle("modal");
    modalWrap.classList.toggle("show");
    if (modalWrap.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    }
  }
};

modalWrap.addEventListener("click", (event) => {
  if (event.target === modalWrap) {
    modalWrap.classList.toggle("show");

    if (mediaQMiddle.matches) {
      navContainer.classList.toggle("modal");
      navContainer.classList.toggle("mini");
    }

    if (mediaQMin.matches || window.location.pathname.includes("videos")) {
      navContainer.classList.toggle("modal");
      navContainer.classList.toggle("close");
    }

    if (!modalWrap.classList.contains("show")) {
      document.body.style.overflow = "auto";
    }
  }
});

navBtn.addEventListener("click", handleNavBtn);

const handleMeadia = (e) => {
  if (!window.location.pathname.includes("videos")) {
    if (mediaQ.matches) {
      navContainer.classList.remove("close");
      page.classList.remove("close");
      navContainer.classList.remove("mini");
      page.classList.remove("mini");
    }

    if (mediaQMiddle.matches) {
      navContainer.classList.remove("close");
      page.classList.remove("close");
      navContainer.classList.add("mini");
      page.classList.add("mini");
    }

    if (mediaQMin.matches) {
      navContainer.classList.remove("mini");
      page.classList.remove("mini");
      navContainer.classList.add("close");
      page.classList.add("close");
    }
  }
};

handleMeadia();
mediaQ.addEventListener("change", handleMeadia);
mediaQMin.addEventListener("change", handleMeadia);
