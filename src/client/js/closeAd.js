const handleAdClose = (event) => {
  if (event.target.id === "close-btn") {
    event.preventDefault();
    const mainAd = event.target.parentElement;
    mainAd.className = "close";
  }
};

window.addEventListener("click", handleAdClose);
