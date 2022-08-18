const inputVideo = document.getElementById("input");

const handleFileChanged = async (e) => {
  e.preventDefault();
  if (e.currentTarget.files.length >= 1) {
    let data = new FormData();
    data.append("file", e.currentTarget.files[0]);
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    // 비디오파일 url을 ffmpeg로 보내기
    const response = await fetch(`/api/thumbnail`, {
      method: "POST",
      body: e.currentTarget.files[0],
    });
    const res = await response.json();
    console.log(res);
    // console.log("썸네일 그리기");
  }
};

inputVideo.addEventListener("change", handleFileChanged);
