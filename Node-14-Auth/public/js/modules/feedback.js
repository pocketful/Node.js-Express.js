function clearErrSpans() {
  document.querySelectorAll('.err').forEach((errEl) => {
    const error = errEl;
    error.innerHTML = '';
    error.previousElementSibling.style.border = 'none';
  });
}

function clearErrCommon(output) {
  const errorCommon = document.getElementById(output);
  errorCommon.innerHTML = '';
  return errorCommon;
}

export function feedback(output, message) {
  clearErrSpans();
  const errorCommon = clearErrCommon(output);

  if (typeof message === 'string') {
    errorCommon.textContent = message;
  }

  if (Array.isArray(message)) {
    message.forEach((errObj) => {
      document.getElementById(errObj.path).style.border = '2px solid red';
      document.getElementById(errObj.path).nextElementSibling.textContent = errObj.message;
      // const input = document.querySelector(`#${form} > * > #${errObj.path}`); // #formLogin > * > #email
      // input.nextElementSibling.innerHTML = '';
      // input.nextElementSibling.textContent = errObj.message;
      // dest.innerHTML += `* ${errObj.message}<br>`;
    });
  }
}

/* passwords --------------------------------------------------------------------- */
const passInpEl = document.getElementById('password');
const pass2InpEl = document.getElementById('password2');

// function setStyle(el, value) {
//   const element = el;
//   element.style.border = value;
// }

// function setNextElSibTextContent(el, value) {
//   const element = el;
//   element.nextElementSibling.textContent = value;
// }

export function clearFeedback(output) {
  // clearErrSpans();
  clearErrCommon(output);
  passInpEl.style.border = 'none';
  pass2InpEl.style.border = 'none';
  passInpEl.nextElementSibling.textContent = '';
  pass2InpEl.nextElementSibling.textContent = '';
  // setStyle(passInpEl, 'none');
  // setStyle(pass2InpEl, 'none');
  // setNextElSibTextContent(passInpEl, '');
  // setNextElSibTextContent(pass2InpEl, '');
}

export function passwordFeedback() {
  passInpEl.style.border = '2px solid red';
  pass2InpEl.style.border = '2px solid red';
  passInpEl.nextElementSibling.textContent = "Passwords does't match";
  pass2InpEl.nextElementSibling.textContent = "Passwords does't match";
  // setStyle(passInpEl, '2px solid red');
  // setStyle(pass2InpEl, '2px solid red');
  // setNextElSibTextContent(passInpEl, "Passwords does't match");
  // setNextElSibTextContent(pass2InpEl, "Passwords does't match");
}
