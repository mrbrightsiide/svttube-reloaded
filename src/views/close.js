const closeBtn = document.getElementById("close-btn");
let clicked = 0;
closeBtn.onclick = function () {
  if (clicked) {
    closeBtn.className = "close";
    clicked = 0;
  } else {
    closeBtn.className = "open";
    clicked = 1;
  }
};
