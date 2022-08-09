const handleAdClose = (event) => {
  if (event.target.id === "close-btn") {
    event.preventDefault();
    const mainAd = event.target.parentElement;
    mainAd.remove();
  }
};

window.addEventListener("click", handleAdClose);
