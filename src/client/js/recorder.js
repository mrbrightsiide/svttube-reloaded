import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
let actionBtn = "";
const modalWrap = document.createElement("div");
const modal = document.createElement("div");
const body = document.querySelector("body");
const recordBtn = document.querySelector("#record-btn");
let video = document.createElement("video");
const videoWrap = document.createElement("div");
const btn = document.createElement("button");

modalWrap.classList.add("modal-wrap");
modal.classList.add("modal-cont");
video.setAttribute("id", "preview");
videoWrap.classList.add("video-wrap");
btn.setAttribute("id", "actionBtn");
btn.innerText = "Start Recording";
videoWrap.append(video);
modal.append(videoWrap);
modal.append(btn);
modalWrap.append(modal);
document.body.prepend(modalWrap);

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);

  actionBtn.innerText = "Transcoding...";

  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  await ffmpeg.run("-i", files.input, "-r", "60", files.output);

  const mp4File = ffmpeg.FS("readFile", files.output);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });

  const mp4Url = URL.createObjectURL(mp4Blob);

  downloadFile(mp4Url, "MyRecording.mp4");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  video = document.getElementById("preview");
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 1000);
};

const init = async () => {
  video = document.getElementById("preview");
  if (!video.srcObject) {
    videoWrap.classList.add("is-loading");
  }
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  videoWrap.classList.remove("is-loading");
  video.srcObject = stream;
  video.play();
};

recordBtn.addEventListener("click", (e) => {
  modalWrap.classList.toggle("show");
  actionBtn = document.getElementById("actionBtn");
  if (!video.getAttributeNames().includes("src")) init();
  if (modalWrap.classList.contains("show")) {
    body.style.overflow = "hidden";
  }
  actionBtn.addEventListener("click", handleStart);
});

modalWrap.addEventListener("click", (event) => {
  if (event.target === modalWrap) {
    modalWrap.classList.toggle("show");

    if (!modalWrap.classList.contains("show")) {
      body.style.overflow = "auto";
    }
  }
});
