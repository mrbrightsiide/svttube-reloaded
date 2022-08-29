const video = document.querySelector("video");
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
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

video.play();
playBtnIcon.classList = "fas fa-pause";

const inputRangeBgFill = (element, value, pointColor, bgColor) => {
  element.setAttribute(
    "style",
    `background:linear-gradient(to right, ${pointColor} 0%, ${pointColor} ${value}%, ${bgColor} ${value}%, ${bgColor} 100%)`
  );
};

inputRangeBgFill(
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
    ? inputRangeBgFill(volumeRange, "0", "#fff", "rgba(100, 100, 100, 0.8)")
    : inputRangeBgFill(
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
  inputRangeBgFill(
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
  inputRangeBgFill(timeline, timeValue, "#ff1300", "#ddd");
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
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
  controlsMovementTimeout = setTimeout(hideControls, 1000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 200);
};

const handleEended = () => {
  // const { id } = videoContainer.dataset;
  // fetch(`/api/videos/${id}/view`, { method: "POST" });
  playBtnIcon.classList = "fa-solid fa-rotate-right";
};

volumeContainer.addEventListener("mousemove", (e) => {
  volumeRange.classList.add("showing");
});
volumeContainer.addEventListener("mouseleave", (e) => {
  volumeRange.classList.remove("showing");
});
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEended);
video.addEventListener("click", handlePlayClick);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keyup", handleSpacebarPress);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
