console.log(`homepage client script successfully loaded.`);

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

  } catch (err) {
    document.location.replace(`/error`)
  }


}

const handleCommentSubmit = async (e) => {
  e.preventDefault();
  console.log(`handleCommentSubmit FIRED`);
  let post_id = e.target.id;
  let comment_body = document.getElementById(`new-comment-body-${post_id}`).value;
  let commentData = {
    post_id,
    comment_body,
  }
  console.log(commentData);
  submitCommentToServer(commentData);
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