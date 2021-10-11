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


const renderUserBlogPosts = async () => {
  console.log(`renderUserBlogPosts FIRED`);

};

document.addEventListener('DOMContentLoaded', renderUserBlogPosts)

submitPostButton.addEventListener(`click`, handlePostSubmit);