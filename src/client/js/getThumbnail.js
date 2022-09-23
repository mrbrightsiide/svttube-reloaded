import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const inputVideo = document.querySelector("#videoInput");
const inputThumb = document.querySelector("#thumb");
const thumbUploadBtn = document.querySelector(".upload-thumb-btn");
const createdThumbPreview = document.querySelector(".thumbnail-preview");
const inputThumbPreview = document.querySelector(".thumbnail-input-preview");
let createdThumbfileUrl = "";
let uploadedThumbfile = "";
let isLoading = false;
const uploadVideoBtn = document.querySelector(".upload-video-wrap");

uploadVideoBtn.addEventListener("click", () => {
  inputVideo.click();
});

const onUploadVideo = async (e) => {
  e.preventDefault();
  let videoFile = window.URL.createObjectURL(inputVideo.files[0]);

  const files = {
    input: "upload.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
  };

  const ffmpeg = createFFmpeg({ log: true });

  uploadedThumbfile = "";
  if (inputThumbPreview.classList.contains("selected")) {
    inputThumbPreview.classList.remove("selected");
  }
  if (inputThumbPreview.classList.contains("unselected")) {
    inputThumbPreview.classList.remove("unselected");
  }
  inputThumbPreview.setAttribute("style", `background-image:url("")`);
  if (createdThumbPreview.classList.contains("selected")) {
    createdThumbPreview.classList.remove("selected");
  }
  if (createdThumbPreview.classList.contains("unselected")) {
    createdThumbPreview.classList.remove("unselected");
  }
  createdThumbPreview.setAttribute("style", `background-image:url("")`);
  isLoading = true;
  createdThumbPreview.classList.add("is-loading");
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:00",
    "-frames:v",
    "1",
    files.thumb
  );

  const thumbFile = ffmpeg.FS("readFile", files.thumb);
  createdThumbfileUrl = thumbFile;
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const thumbUrl = URL.createObjectURL(thumbBlob);

  if (createdThumbPreview.childNodes[0]) {
    createdThumbPreview.childNodes[0].remove();
  }

  isLoading = false;
  createdThumbPreview.classList.remove("is-loading");
  createdThumbPreview.setAttribute(
    "style",
    `background-image:url(${thumbUrl})`
  );
  selected(createdThumbPreview);

  if (uploadedThumbfile) {
    unSelected(inputThumbPreview);
  }

  const myFile = new File([thumbFile], "thumbnail.jpg", {
    type: "image/jpeg",
  });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(myFile);
  inputThumb.files = dataTransfer.files;

  URL.revokeObjectURL(videoFile);
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
    selected(inputThumbPreview);
    unSelected(createdThumbPreview);
  };
  reader.readAsDataURL(inputThumb.files[0]);
};

const onClickCreatedThumb = (e) => {
  if (createdThumbfileUrl === "" && !isLoading) {
    return alert(
      "Please upload video first, Thumbnail would be Automatically created"
    );
  }
  if (isLoading) {
    return e.preventDefault();
  }
  selected(createdThumbPreview);
  unSelected(inputThumbPreview);
  const myFile = new File([createdThumbfileUrl], "thumbnail.jpg", {
    type: "image/jpeg",
  });
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(myFile);
  inputThumb.files = dataTransfer.files;
};

const onClickInputThumb = (e) => {
  if (uploadedThumbfile === "") {
    return inputThumb.click();
  }
  inputThumb.files = uploadedThumbfile;
  selected(inputThumbPreview);
  unSelected(createdThumbPreview);
};

const unSelected = (el) => {
  el.classList.remove("selected");
  el.classList.add("unselected");
};

const selected = (el) => {
  el.classList.add("selected");
  el.classList.remove("unselected");
};

thumbUploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  inputThumb.click();
});
inputVideo.addEventListener("change", onUploadVideo);
inputThumb.addEventListener("change", onUploadThumbnail);
createdThumbPreview.addEventListener("click", onClickCreatedThumb);
inputThumbPreview.addEventListener("click", onClickInputThumb);
