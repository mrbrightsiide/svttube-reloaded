import formatCreatedDate from "./formatCreatedDate";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.getElementsByClassName("delete_comment_btn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const comment = document.createElement("li");
  const button = document.createElement("button");
  button.classList.add("delete_comment_btn");
  button.innerText = "❌";
  comment.innerHTML = `
  <li class="video__comment" id="comment" data-id=${id}>
    <div class="comment-content">
        <a>
            <div class="comment-avatar">
              <img src="/${userAvatarUrl.replaceAll("&quot;", "")}"/>
            </div>
        </a>
        <div class="comment-text">
            <div>
              <span>${username}</span>
              <span>${formatCreatedDate(Date.now())}</span>
            </div>
            <span class="comment-txt">${text}</span>
        </div>
    </div>
  </li>`;
  button.addEventListener("click", handleDelete);
  comment.childNodes[1].appendChild(button);
  videoComments.prepend(comment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text == "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
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
}

const handleDelete = async (event) => {
  event.preventDefault();
  const videoid = videoContainer.dataset.id;
  const clickedComment = event.target.parentElement;
  const id = clickedComment.dataset.id;
  const respons = await fetch(`/api/comment/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoid }),
  });
  if (respons.status === 403) {
    alert("Not authorized!");
  } else if (respons.status === 201) {
    clickedComment.remove();
  }
};

Array.from(deleteBtns).forEach((btn) =>
  btn.addEventListener("click", handleDelete)
);
