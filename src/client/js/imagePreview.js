const preview = document.querySelector("#preview-wrap");
const input = document.querySelector("#avatar");
const previewImg = document.querySelector("#preview-img");

const onImageUpload = (e) => {
  var reader = new FileReader();
  reader.onload = function (e) {
    previewImg.setAttribute("src", "");
    previewImg.setAttribute("src", `${e.target.result}`);
  };
  reader.readAsDataURL(input.files[0]);
};

input.addEventListener("change", onImageUpload);
preview.addEventListener("click", () => {
  input.click();
});
