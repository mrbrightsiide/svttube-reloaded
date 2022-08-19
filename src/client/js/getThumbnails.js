import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const formBox = document.querySelector(".form-box");

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

  // await ffmpeg.run("-i", files.input, "-r", "60", files.output);
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
  console.log(thumbUrl);
  // downloadFile(thumbUrl, "MyThumbnail.jpg");
  // ffmpeg.FS("unlink", files.input);
  // ffmpeg.FS("unlink", files.output);
  // ffmpeg.FS("unlink", files.thumb);

  const thumbPreview = document.createElement("img");

  thumbPreview.setAttribute("src", thumbUrl);

  formBox.append(thumbPreview);

  // URL.revokeObjectURL(thumbUrl);

  // console.log(fileUrl);

  // if (fileUrl) {
  //   // 비디오파일 url을 ffmpeg로 보내기
  //   await fetch(`/api/thumbnail`, {
  //     method: "POST",
  //     headers: {
  //       videofile: fileUrl,
  //     },
  //   })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }
  // const hmmm = await response.json();
  // dom으로 썸네일 그리기;
};

inputVideo.addEventListener("change", onUploadVideo);
