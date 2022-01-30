const closeBtn = document.getElementById("close-btn");
const mainAd = closeBtn.parentElement;
const categoryBar = document.querySelector(".category-bar");
const handleAdClose = (event) => {
  event.preventDefault();
  console.log("button clicked!");
  mainAd.className = "close";
};
closeBtn.addEventListener("click", handleAdClose);
