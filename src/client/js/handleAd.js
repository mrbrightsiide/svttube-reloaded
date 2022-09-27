//Play random ad
const adList = [
  {
    text: "_WORLD",
    videoId: "fb0e4fed4fd8d458d09911666581ea4d",
    videoLink: "632ed232842cde0016a0aa3c",
    bgColor: "#f1ebff",
  },
  {
    text: "Rock with you",
    videoId: "033d252fe12e1e8964201dd359d46ecb",
    videoLink: "6332dedcf891580016cfbd9b",
    bgColor: "#dbf0ff",
  },
  {
    text: "HOT",
    videoId: "a34e9b2bd7af04d3a8780ab8ab90144a",
    videoLink: "632db0702d942200166b3448",
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
adVideo.setAttribute(
  "src",
  `https://svttube.s3.amazonaws.com/videos/${currentAd.videoId}`
);
adBtnAnchor.setAttribute(
  "href",
  `https://svttube.herokuapp.com/videos/${currentAd.videoLink}`
);
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
