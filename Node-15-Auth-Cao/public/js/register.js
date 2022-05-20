// eslint-disable-next-line object-curly-newline
import { checkInput, clearErrors, errorsFeArr, handleErrors } from './modules/feedback.js';
import { BASE_URL } from './modules/fetch.js';

const { formRegister } = document.forms;

async function registerUser(newRegisterObj) {
  console.log('newRegisterObj ===', newRegisterObj);
  try {
    const resp = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newRegisterObj),
    });
    // console.log('response ===', resp);
    const data = await resp.json();
    console.log('data ===', data);
    if (data.success) {
      formRegister.reset();
      console.log('registered successfully');
      handleErrors(data.message);
      // eslint-disable-next-line no-return-assign
      setTimeout(() => (window.location.href = 'login.html'), 2000);
    }
    handleErrors(data.message);
  } catch (err) {
    console.log('error ===', err);
  }
}

formRegister.addEventListener('submit', (event) => {
  event.preventDefault();
  const newRegObj = {
    email: formRegister.email.value.trim(),
    password: formRegister.password.value.trim(),
    password2: formRegister.password2.value.trim(),
  };
  clearErrors();
  checkInput(newRegObj.email, 'email', ['required', 'minLength-3', 'email']);
  checkInput(newRegObj.password, 'password', ['required', 'minLength-3', 'maxLength-10']);
  checkInput(newRegObj.password2, 'password2', ['required', 'minLength-3', 'maxLength-10', `ref-password-${newRegObj.password}`]);
  // checkInput(newRegObj.password2, 'password2', ['required', 'minLength-3', 'maxLength-10',
  // { match: newRegObj.password, field: 'password' }]);

  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors(); // handleErrors(errorsArr);
    return;
  }
  registerUser(newRegObj);
});
