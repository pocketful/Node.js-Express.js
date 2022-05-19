function clearErrSpans() {
  document.querySelectorAll('.err').forEach((errEl) => {
    const error = errEl;
    error.textContent = '';
    // error.previousElementSibling.style.border = 'none';
    error.previousElementSibling.classList.remove('err-input');
  });
}

function clearErrCommon(output) {
  const errorCommon = document.getElementById(output);
  errorCommon.textContent = '';
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
      const errEl = document.getElementById(errObj.field);
      // const errEl = formEl.elements[errObj.field];
      errEl.classList.add('err-input');
      errEl.nextElementSibling.textContent = errObj.message;
      // errEl.style.border = '2px solid red';
      // errEl.nextElementSibling.textContent = errObj.message;
      // const input = document.querySelector(`#${form} > * > #${errObj.path}`); // #formLogin > * > #email
    });
  }
}

/* passwords --------------------------------------------------------------------- */
const passInpEl = document.getElementById('password');
const pass2InpEl = document.getElementById('password2');

export function clearFeedback(output) {
  // clearErrSpans();
  clearErrCommon(output);
  passInpEl.style.border = 'none';
  pass2InpEl.style.border = 'none';
  passInpEl.nextElementSibling.textContent = '';
  pass2InpEl.nextElementSibling.textContent = '';
}

export function passwordFeedback() {
  passInpEl.style.border = '2px solid red';
  pass2InpEl.style.border = '2px solid red';
  passInpEl.nextElementSibling.textContent = "Passwords does't match";
  pass2InpEl.nextElementSibling.textContent = "Passwords does't match";
}
