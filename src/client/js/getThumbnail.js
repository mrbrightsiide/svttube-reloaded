import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const formBox = document.querySelector(".thumbnailpreview");
const inputThumb = document.querySelector("#thumb");
const inputVideo = document.querySelector("#videoInput");

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
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
  const thumbUrl = URL.createObjectURL(thumbBlob);

  const thumbPreview = document.createElement("img");

  thumbPreview.setAttribute("src", thumbUrl);
  thumbPreview.setAttribute("id", "thumb-preview");
  thumbPreview.setAttribute("style", "object-fit:cover");
  formBox.classList.add("selected");

  formBox.append(thumbPreview);

  const myFile = new File([thumbFile], "thumbnail.jpg", {
    type: "image/jpeg",
  });

  // Create a DataTransfer to get a FileList
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(myFile);
  inputThumb.files = dataTransfer.files;
};

inputVideo.addEventListener("change", onUploadVideo);
