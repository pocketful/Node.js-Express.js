// eslint-disable-next-line object-curly-newline
import { checkInput, clearErrors, errorsFeArr, handleErrors } from './modules/feedback.js';
import { BASE_URL } from './modules/fetch.js';

const { formLogin } = document.forms;
// const formLogin = document.getElementById('formLogin');
const passEl = formLogin.elements.password; // name or id email

async function loginUser(newLoginObj) {
  console.log('newLoginObj ===', newLoginObj);
  try {
    const resp = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newLoginObj),
    });
    console.log('resp ===', resp);
    const data = await resp.json();
    console.log('data ===', data);
    // console.log('data.details ===', data.message);
    if (data.success) {
      // { success: true, message: 'Login success.', token: '' }
      // save token to localStorage
      localStorage.setItem('userToken', data.token);
      handleErrors(data.message);
      formLogin.reset();
      // eslint-disable-next-line no-return-assign
      setTimeout(() => (window.location.href = 'index.html'), 2000);
    } else {
      // { success: false, message: [{ message: '', field: '' }] }
      handleErrors(data.message);
    }
  } catch (err) {
    console.log('error ===', err);
  }
}

passEl.addEventListener('blur', (event) => {
  // clearErrors();
  const el = event.currentTarget;
  checkInput(el.value, el.name, ['required', 'minLength-3', 'maxLength-10']);
  handleErrors();
});

passEl.addEventListener('input', (event) => {
  clearErrors();
  // const el = event.currentTarget;
  // if (el.value.length > 3) {
  //   clearErrors();
  //   checkInput(el.value, el.name, ['required', 'minLength-3', 'email']);
  //   handleErrors();
  // }
});

formLogin.addEventListener('submit', (event) => {
  event.preventDefault();
  const newLoginObj = {
    email: formLogin.email.value.trim(),
    password: formLogin.password.value.trim(),
  };
  clearErrors();
  checkInput(newLoginObj.email, 'email', ['required', 'minLength-3', 'email']);
  checkInput(newLoginObj.password, 'password', ['required', 'minLength-3', 'maxLength-10']);

  // if there are errors in FE
  if (errorsFeArr.length) {
    handleErrors(); // handleErrors('feedbackLog', errorsArr);
    return;
  }
  loginUser(newLoginObj);

  // errors handling v1
  // if (checkInputObj(newLoginObj)) {
  //   const errorsFeArr = [];
  //   console.log('checkInputObj');
  //   handleErrors('feedbackLog', errorsFeArr);
  // }
  // function checkInputObj(loginObj) {
  //   for (const key in loginObj) {
  //     console.log(`${key}: ${loginObj[key]}`);
  //     const value = loginObj[key];
  //     console.log('value ===', value);
  //     if (value === '') return true;
  //   }
  // }
});
