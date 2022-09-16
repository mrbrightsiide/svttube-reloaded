const mediaQ = window.matchMedia("screen and (min-width: 1326px)");
const mediaQMiddle = window.matchMedia(
  "(max-width: 1325px) and (min-width: 720px)"
);
const mediaQMin = window.matchMedia(
  "(max-width: 719px) and (min-width: 300px)"
);
const navBtn = document.querySelectorAll("#guide_menu_btn");
const navContainer = document.querySelector(".guide-container");
const page = document.querySelector(".page-manager");
const videoPage = window.location.pathname.includes("videos");

const createModal = () => {
  const modalWrap = document.createElement("div");
  const modal = document.createElement("div");
  modalWrap.classList.add("modal-wrap");
  modalWrap.append(modal);
  document.body.prepend(modalWrap);
  modalWrap.classList.add("show");

  modalWrap.addEventListener("click", (event) => {
    deleteModal();
    if (event.target === modalWrap) {
      modalWrap.classList.toggle("show");
      navContainer.classList.toggle("modal");

      if (mediaQMiddle.matches && !videoPage) {
        navContainer.classList.toggle("mini");
      }

      if (mediaQMin.matches || videoPage) {
        navContainer.classList.toggle("close");
      }
    }
  });
};

const deleteModal = () => {
  const modal = document.body.querySelector(".modal-wrap");
  if (modal) {
    modal.remove();
  }
};

const handleNavBtn = (e) => {
  if (!mediaQ.matches && !videoPage) {
    navContainer.classList.contains("modal") ? deleteModal() : createModal();
  }

  if (videoPage) {
    navContainer.classList.contains("modal") ? deleteModal() : createModal();
  }

  if (mediaQ.matches && !videoPage) {
    navContainer.classList.toggle("mini");
    page.classList.toggle("mini");
  }

  if (mediaQMiddle.matches && !videoPage) {
    navContainer.classList.toggle("modal");
    navContainer.classList.toggle("mini");
  }

  if (mediaQMin.matches || videoPage) {
    navContainer.classList.toggle("modal");
    navContainer.classList.toggle("close");
  }
};

const handleMeadia = (e) => {
  if (navContainer.classList.contains("modal")) {
    const modalWrap = document.querySelector(".modal-wrap");
    modalWrap.remove();
    navContainer.classList.remove("modal");
  }

  if (page.classList.contains("close")) {
    navContainer.classList.remove("close");
    page.classList.remove("close");
  }

  if (page.classList.contains("mini")) {
    navContainer.classList.remove("mini");
    page.classList.remove("mini");
  }

  if (mediaQMiddle.matches && !videoPage) {
    navContainer.classList.add("mini");
    page.classList.add("mini");
  }

  if (mediaQMin.matches || videoPage) {
    navContainer.classList.add("close");
    page.classList.add("close");
  }
};

mediaQ.addEventListener("change", handleMeadia);
mediaQMin.addEventListener("change", handleMeadia);
navBtn.forEach((btn) => {
  btn.addEventListener("click", handleNavBtn);
});
handleMeadia();
