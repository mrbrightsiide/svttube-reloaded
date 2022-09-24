const video = document.createElement("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const volumeContainer = document.querySelector(".videoControls__volume");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const theaterBtn = document.getElementById("theater");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const playerContainer = document.querySelector(".player-container");
const commentContainer = document.querySelector(".comment-container");
const relatedContainer = document.querySelector(".related-container");
const mastHead = document.querySelector(".masthead-container");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

playBtnIcon.classList = "fas fa-pause";

if (window.location.pathname.includes("users")) {
  const videoContainer = document.querySelector("#videoContainer");
  const anchor = document.createElement("a");
  const title = document.createElement("h3");
  videoContainer.classList.remove("basic");
  videoContainer.classList.remove("theater");
  anchor.setAttribute("href", `/videos/${mainVideoId}`);
  anchor.classList.add("main-video-anchor");
  title.innerText = mainVideoTitle
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"');
  anchor.append(title);
  videoControls.prepend(anchor);
}

const fillInputRangeBg = (element, value, pointColor, bgColor) => {
  element.setAttribute(
    "style",
    `background:linear-gradient(to right, ${pointColor} 0%, ${pointColor} ${value}%, ${bgColor} ${value}%, ${bgColor} 100%)`
  );
};

fillInputRangeBg(
  volumeRange,
  volumeValue * 100,
  "#fff",
  "rgba(100, 100, 100, 0.8)"
);

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleSpacebarPress = (e) => {
  if (e.keyCode == 32) {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
  video.muted
    ? fillInputRangeBg(volumeRange, "0", "#fff", "rgba(100, 100, 100, 0.8)")
    : fillInputRangeBg(
        volumeRange,
        video.volume * 100,
        "#fff",
        "rgba(100, 100, 100, 0.8)"
      );
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
  }
  muteBtnIcon.classList =
    value === "0" ? "fas fa-volume-mute" : "fas fa-volume-up";
  volumeValue = value;
  video.volume = value;
  fillInputRangeBg(
    volumeRange,
    video.volume * 100,
    "#fff",
    "rgba(100, 100, 100, 0.8)"
  );
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = video.duration;
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = video.currentTime;
  let timeValue = (video.currentTime / video.duration) * 100;
  fillInputRangeBg(timeline, timeValue, "#ff1300", "#ddd");
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (window.location.pathname.includes("users")) {
    const anchor = document.querySelector(".main-video-anchor");
    anchor.classList.toggle("hide");
  }
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
    theaterBtn.setAttribute("style", "display : block");
    fullScreenBtn.parentElement.setAttribute("title", "Fullscreen");
  } else {
    fullScreenBtn.parentElement.setAttribute("title", "Exit fullscreen");
    videoContainer.requestFullscreen();
    theaterBtn.setAttribute("style", "display : none");
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  if (!video.paused) {
    controlsMovementTimeout = setTimeout(hideControls, 1000);
  }
};

const handleMouseLeave = () => {
  if (video.paused) {
    videoControls.classList.add("showing");
  } else {
    controlsTimeout = setTimeout(hideControls, 200);
  }
};

const handleEended = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
  playBtnIcon.classList = "fa-solid fa-rotate-right";
};

theaterBtn.addEventListener("click", async (e) => {
  [
    videoContainer,
    playerContainer,
    relatedContainer,
    commentContainer,
    mastHead,
    theaterBtn,
  ].map((el) => {
    el.classList.toggle("theater");
    el.classList.toggle("basic");
  });
  if (theaterBtn.classList.contains("basic")) {
    theaterBtn.parentElement.setAttribute("title", "Theater mode");
    theaterBtn.parentElement.setAttribute("data-id", "basic");
  } else {
    theaterBtn.parentElement.setAttribute("title", "Default view");
    theaterBtn.parentElement.setAttribute("data-id", "theater");
  }
  let mode = theaterBtn.parentElement.dataset.id;
  await fetch(`/api/theatermode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mode }),
  });
});

volumeContainer.addEventListener("mousemove", (e) => {
  volumeRange.classList.add("showing");
});
volumeContainer.addEventListener("mouseleave", (e) => {
  volumeRange.classList.remove("showing");
});
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEended);
video.addEventListener("click", handlePlayClick);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keyup", handleSpacebarPress);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
video.setAttribute("src", videoSrc);
video.setAttribute("crossorigin", "crossorigin");
video.autoplay = true;
videoContainer.prepend(video);
