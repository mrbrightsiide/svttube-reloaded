import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const formBox = document.querySelector(".thumbnail-preview");
const inputThumb = document.querySelector("#thumb");
const thumbUploadBtn = document.querySelector(".upload-thumb-btn");
const inputThumbPreview = document.querySelector(".thumbnail-input-preview");
const inputVideo = document.querySelector("#videoInput");
let createdThumbfileUrl = "";
let uploadedThumbfile = "";

const onUploadVideo = async (e) => {
  e.preventDefault();
  let videoFile = window.URL.createObjectURL(inputVideo.files[0]);

  const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
  };

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  const thumbFile = ffmpeg.FS("readFile", files.thumb);
  createdThumbfileUrl = thumbFile;
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const thumbUrl = URL.createObjectURL(thumbBlob);

  if (formBox.childNodes[0]) {
    formBox.childNodes[0].remove();
  }
  formBox.setAttribute("style", `background-image:url(${thumbUrl})`);
  formBox.classList.add("selected");
  inputThumbPreview.classList.remove("selected");
  const myFile = new File([thumbFile], "thumbnail.jpg", {
    type: "image/jpeg",
  });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(myFile);
  inputThumb.files = dataTransfer.files;
};

const onUploadThumbnail = (e) => {
  uploadedThumbfile = e.target.files;
  var reader = new FileReader();
  reader.onload = function (e) {
    if (inputThumbPreview.childNodes[0]) {
      inputThumbPreview.childNodes[0].remove();
    }
    inputThumbPreview.setAttribute(
      "style",
      `background-image:url(${e.target.result})`
    );
    inputThumbPreview.classList.add("selected");
    formBox.classList.remove("selected");
  };
  reader.readAsDataURL(inputThumb.files[0]);
};

inputVideo.addEventListener("change", onUploadVideo);
inputThumb.addEventListener("change", onUploadThumbnail);
thumbUploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputThumb.click();
});
formBox.addEventListener("click", (e) => {
  formBox.classList.add("selected");
  inputThumbPreview.classList.remove("selected");
  const myFile = new File([createdThumbfileUrl], "thumbnail.jpg", {
    type: "image/jpeg",
  });
  console.log(createdThumbfileUrl);
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(myFile);
  inputThumb.files = dataTransfer.files;
});

inputThumbPreview.addEventListener("click", (e) => {
  inputThumb.files = uploadedThumbfile;
  inputThumbPreview.classList.add("selected");
  formBox.classList.remove("selected");
});
