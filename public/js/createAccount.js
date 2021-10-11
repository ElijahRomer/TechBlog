console.log(`createAccount client script successfully loaded.`)

const handleFormSubmit = async (e) => {
  e.preventDefault();
  let user_name = document.querySelector(`#user_name`).value;
  let password = document.querySelector(`#password`).value;

  let accountData = { user_name, password }

  console.log(accountData)

  const response = await fetch(`/api/user/createaccount`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accountData)
  })


  // Begin logic to reveal invalid login message if attempt is rejected.
  let invalidMsgEl = document.querySelector(`#errorMsg`);

  const timeout = (fn, ms) => {
    return new Promise(resolve => setTimeout(() => {
      fn();
      resolve();
    }, ms));
  };

  const hideErrorMsg = () => {
    invalidMsgEl.classList.add("d-none")
  };

  const revealErrorMsg = async (invalidMsgEl) => {
    invalidMsgEl.classList.remove("d-none")
    await timeout(hideErrorMsg, 7000)
  };

  if (!response.ok) {
    console.log(`!rawResponse.ok check worked.`)
    revealErrorMsg(invalidMsgEl);
  } else {
    document.location.replace('/dashboard');
  }
}

const loginButton = document.querySelector(`#create-account`)

loginButton.addEventListener(`click`, handleFormSubmit);