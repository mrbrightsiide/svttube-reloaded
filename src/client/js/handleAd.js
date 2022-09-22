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
    videoLink: "6322f49a9f87a74618ff25bc",
    bgColor: "#dbf0ff",
  },
  {
    text: "HOT",
    videoId: "37e8424771ac397df014c385136a9d7a",
    videoLink: "6327befe8894e336a8285d9b",
    bgColor: "#ffe6d1",
  },
];

const currentAd = adList[Math.floor(Math.random() * 3)];
const adContainer = document.querySelector(".masthead_ad");
const adText = document.querySelector("#banner-txt");
const adVideo = document.querySelector("#banner-video");
const adBtnAnchor = document.querySelector("#banner-btn");
const videoContainer = document.querySelector("#videoContainer");

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
    document
      .querySelector(".contents")
      .setAttribute("style", "margin-top : 56px");
  }
};
window.addEventListener("click", handleAdClose);

// Control sound button of ad video
const muteBtn = document.createElement("button");
const muteBtnText = document.createElement("i");
muteBtnText.classList.add("fas");
muteBtn.setAttribute("id", "mute");
muteBtnText.classList.add("fa-volume-mute");
muteBtn.append(muteBtnText);
videoContainer.prepend(muteBtn);

const handleMuteClick = (e) => {
  if (adVideo.muted) {
    adVideo.muted = false;
  } else {
    adVideo.muted = true;
  }

  muteBtnText.classList = adVideo.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
};

muteBtn.addEventListener("click", handleMuteClick);
