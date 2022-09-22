const profileImgs = document.querySelectorAll(".profile-img");
const thumbnailImgs = document.querySelectorAll(".thumbnail-img");

profileImgs.forEach((img) => {
  img.setAttribute("onerror", 'this.src="/static/img/profile_default.jpg";');
});

thumbnailImgs.forEach((img) => {
  img.setAttribute("onerror", 'this.src="/static/img/thumb_default.jpg";');
});
