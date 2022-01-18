const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.getElementsByClassName("delete_comment_btn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoID = videoContainer.dataset.id;
  if (text == "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoID}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  console.log(deleteBtn);
}

const handleDelete = async (event) => {
  event.preventDefault();
  console.log("button clicked!");
  const comment = document.getElementById("comment");
  const id = comment.dataset.id;
  const respons = await fetch(`/api/comment/${id}/delete`, {
    method: "DELETE",
  });
  if (respons.status === 201) {
    comment.remove();
  }
};

// deleteBtn.addEventListener("click", handleDelete);
