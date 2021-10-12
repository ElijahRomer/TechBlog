console.log(`dashboard client script successfully loaded.`)


const submitPostButton = document.querySelector(`#submit`);

const invalidMsgEl = document.querySelector(`#errorMsg`);

const timeout = (fn, ms) => {
  return new Promise(resolve => setTimeout(() => {
    fn();
    resolve();
  }, ms));
};

const hideErrorMsg = () => {
  invalidMsgEl.classList.add("d-hidden")
};

const revealErrorMsg = async (invalidMsgEl, message) => {
  invalidMsgEl.textContent = message;
  invalidMsgEl.classList.remove("d-hidden")
  await timeout(hideErrorMsg, 10000)
};

const handlePostSubmit = async (e) => {
  e.preventDefault();
  console.log(`handlePostSubmit FIRED`);
  let post_title = document.querySelector(`#post_title`).value.trim();
  let post_body = document.querySelector(`#post_body`).value.trim();

  let postData = { post_title, post_body }
  console.log(postData);
  try {
    const response = await fetch(`/api/post/submit`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (response.status === 409) {
      console.log(`Post title is already taken.`);
      revealErrorMsg(invalidMsgEl, "A Post with the title you entered already exists. Please enter a different title for your post.");
      return;
    };

    document.location.reload();
  } catch (err) {
    console.log(err);
    revealErrorMsg(invalidMsgEl, "An error occured. Please contact support.")
  }
};

const editBlogPost = async (e) => {
  console.log(`editBlogPost FIRED`);

  let postId = e.target.id;
  let post_titleEl = document.querySelector(`#title${postId}`);
  let post_bodyEl = document.querySelector(`#body${postId}`);

  let post_title = post_titleEl.textContent.trim();
  let post_body = post_bodyEl.textContent.trim();

  let post_title_editor = document.querySelector(`#post_title_edit`);
  let post_body_editor = document.querySelector(`#post_body_edit`);

  post_title_editor.value = post_title.slice(1, -1);
  post_body_editor.textContent = post_body;

  console.log(postId);
  console.log(post_title);
  console.log(post_body);




};
const deleteBlogPost = async (e) => {
  console.log(`deleteBlogPost FIRED`);
  let postId = e.target.id;
  console.log(postId);

  try {
    const response = await fetch(`api/post/delete`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id: postId,
      })
    });
    console.log(response)
    document.location.reload();


  } catch (err) {
    console.log(err);
    revealErrorMsg(invalidMsgEl, "An error occured. Please contact support.")
  }
};

const addBlogPostEditButtonEventListeners = async () => {
  console.log(`addBlogPostEditButtonEventListeners FIRED`);

  const editButtons = document.getElementsByClassName(`edit`);
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener(`click`, editBlogPost);
  };
};

const addBlogPostDeleteButtonEventListeners = async () => {
  console.log(`addBlogPostDeleteButtonEventListeners FIRED`);

  const deleteButtons = document.getElementsByClassName(`delete`);
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener(`click`, deleteBlogPost);
  };
};

document.addEventListener('DOMContentLoaded', addBlogPostEditButtonEventListeners);

document.addEventListener('DOMContentLoaded', addBlogPostDeleteButtonEventListeners);

submitPostButton.addEventListener(`click`, handlePostSubmit);