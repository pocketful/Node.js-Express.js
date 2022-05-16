export default function feedback(output, message) {
  document.querySelectorAll('.err').forEach((errEl) => {
    const error = errEl;
    error.textContent = '';
  });
  const dest = document.getElementById(output);
  // dest.innerHTML = '';

  // if (output === 'password2') {
  //   dest.nextElementSibling.textContent = '';
  //   dest.nextElementSibling.textContent = message;
  // } else {
  //   dest.innerHTML = '';
  // }

  if (typeof message === 'string') {
    dest.textContent = message;
  }
  if (Array.isArray(message)) {
    message.forEach((errObj) => {
      document.getElementById(errObj.path).nextElementSibling.textContent = errObj.message;
      // const input = document.querySelector(`#${form} > * > #${errObj.path}`); // #formLogin > * > #email
      // input.nextElementSibling.innerHTML = '';
      // input.nextElementSibling.textContent = errObj.message;
      // dest.innerHTML += `* ${errObj.message}<br>`;
    });
  }
}
