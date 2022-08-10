//Play random ad
const adList = [
  {
    text: "_WORLD",
    videoId: "cda5d66617537d4c741a9653f95ef2ac",
    videoLink: "62f2474ecf12933da830ef99",
    bgColor: "#f1ebff",
  },
  {
    text: "Rock with you",
    videoId: "88f2d2e2971853e27ef8261e8c7bc4c2",
    videoLink: "62f3795012314b15cc515814",
    bgColor: "#dbf0ff",
  },
  {
    text: "HOT",
    videoId: "facdd0103e955645ae6f454ae45a3180",
    videoLink: "62f37b3612314b15cc51586a",
    bgColor: "#fee0ea",
  },
];

const currentAd = adList[Math.floor(Math.random() * 3)];
const adContainer = document.querySelector(".masthead_ad");
const adText = document.querySelector("#banner-txt");
const adVideo = document.querySelector("#banner-video");
const adBtnAnchor = document.querySelector("#banner-btn");

adText.innerHTML = `Check out the new song<br>"${currentAd.text}" by Seventeen!`;
adVideo.setAttribute("src", `/uploads/videos/${currentAd.videoId}`);
adBtnAnchor.setAttribute("href", `/videos/${currentAd.videoLink}`);
adContainer.setAttribute("style", `background:${currentAd.bgColor}`);

//Close ad when close button clicked
const handleAdClose = (event) => {
  if (event.target.id === "close-btn") {
    event.preventDefault();
    const mainAd = event.target.parentElement;
    mainAd.remove();
  }
};
window.addEventListener("click", handleAdClose);

// Control sound button of ad video
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");

const handleMuteClick = (e) => {
  if (adVideo.muted) {
    adVideo.muted = false;
  } else {
    adVideo.muted = true;
  }

  muteBtnIcon.classList = adVideo.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
};

muteBtn.addEventListener("click", handleMuteClick);
