console.log(`homepage client script successfully loaded.`);

const format_date_time = (date) => {
  // Format date as mmmm dd, yyyy hh:mm {am/pm}
  let EventDate = new Date(date);
  return `${new Intl.DateTimeFormat(`en-US`, { month: 'long' }).format(EventDate)} ${EventDate.getDate()}, ${EventDate.getFullYear()} ${EventDate.toLocaleTimeString(`en-US`, {
    hour: '2-digit',
    minute: '2-digit'
  })}`
};

const submitCommentToServer = async (commentData) => {
  try {
    let response = await fetch(`/api/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    });

    console.log(response);
    return response;

  } catch (err) {
    document.location.replace(`/error`)
  }
};

const appendCommentToPage = (newComment) => {
  console.log(newComment);
  const relevantBlogPostForm = document.getElementById(`comment-form-${newComment.post_id}`);
  let newCommentHTML = `
  <div class="container">
    <div class="row">
      <div class="card my-3">
        <small class="text-muted">On ${format_date_time(newComment.createdAt)}, ${newComment.user_name} said:
        </small>
        <p>${newComment.comment_body}</p>
      </div>
    </div>
  </div>
  `;

  relevantBlogPostForm.insertAdjacentHTML('afterend', newCommentHTML);
}

const handleCommentSubmit = async (e) => {
  e.preventDefault();
  console.log(`handleCommentSubmit FIRED`);
  let post_id = e.target.id;
  let comment_body = document.getElementById(`new-comment-body-${post_id}`).value;

  document.getElementById(`new-comment-body-${post_id}`).value = '';

  let commentData = {
    post_id,
    comment_body,
  }

  let newComment = await submitCommentToServer(commentData)
    .then(comment => comment.json())
    .then(comment => comment);


  appendCommentToPage(newComment);

};

const addCommentButtonEventListeners = () => {
  console.log(`addCommentButtonEventListeners FIRED`)
  const commentSubmitButtons = document.getElementsByClassName(`submit-comment`);

  for (let i = 0; i < commentSubmitButtons.length; i++) {
    commentSubmitButtons[i].addEventListener(`click`, handleCommentSubmit);
  }
  console.log(`Event listeners added to comment submit buttons.`)
};

document.addEventListener(`DOMContentLoaded`, addCommentButtonEventListeners);