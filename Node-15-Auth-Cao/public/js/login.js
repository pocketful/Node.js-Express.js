import { feedback } from './modules/feedback.js';
import { BASE_URL } from './modules/fetch.js';

const { formLogin } = document.forms;

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
    if (data.success) {
      // { success: true, message: 'Login success.', token: '' }
      // save token to localStorage
      localStorage.setItem('userToken', data.token);

      feedback('feedbackLog', data.details);
      formLogin.reset();

      // eslint-disable-next-line no-return-assign
      // setTimeout(() => (window.location.href = 'index.html'), 2000);
    } else {
      // { success: false, details: [{ message: '', field: '' }] }
      feedback('feedbackLog', data.details);
    }
  } catch (err) {
    console.log('error ===', err);
  }
}

/* BE errors:
data.details === [
  { message: '"email" is not allowed to be empty', field: 'email' },
  { message: '"password" length must be at least 3 characters long', field: 'password' }
] */

const errorsArr = [];

function addErrToErrsArr(message, field) {
  errorsArr.push({ message, field });
}

function checkInput(valueToCheck, field, rulesArr) {
  // forEach, map won't stop - will show all the rules. we need to terminate after the first rule. return only terminate one cycle
  // rulesArr.forEach(rule => );
  // for loop is good, for in is newer. with return it will terminate all loop
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    // console.log('valueToCheck===', valueToCheck);
    // console.log('field===', field);
    // console.log('rule===', rule);
    if (rule === 'required') {
      if (valueToCheck === '') {
        addErrToErrsArr(`${field} is not allowed to be empty`, field);
        return;
      }
    }
    if (rule.split('-')[0] === 'minLength') {
      const length = rule.split('-')[1];
      if (valueToCheck.length < length) {
        addErrToErrsArr(`${field} length must be at least ${length} characters long`, field);
      }
    }

    if (rule.split('-')[0] === 'maxLength') {
      const length = rule.split('-')[1];
      if (valueToCheck.length > length) {
        addErrToErrsArr(
          `${field} length must be less than or equal to ${length} characters long`,
          field,
        );
      }
    }

    if (rule === 'email') {
      if (!valueToCheck.includes('@')) {
        addErrToErrsArr(`${field} must be a valid email`, field);
        return;
      }
      if (!valueToCheck.split('@')[1].includes('.')) {
        addErrToErrsArr(`${field} must be a valid email`, field);
      }
    }
  }
}

formLogin.addEventListener('submit', (event) => {
  event.preventDefault();
  const newLoginObj = {
    email: formLogin.email.value.trim(),
    password: formLogin.password.value.trim(),
  };

  checkInput(newLoginObj.email, 'email', ['required', 'minLength-3', 'email']);
  checkInput(newLoginObj.password, 'password', ['required', 'minLength-3', 'maxLength-10']);
  console.log('newLoginObj ===', newLoginObj);
  console.log('FE errorsArr ===', errorsArr);

  feedback('feedbackLog', errorsArr);

  // errors handling v1
  // if (checkInputObj(newLoginObj)) {
  //   const errorsArr = [];
  //   console.log('checkInputObj');
  //   feedback('feedbackLog', errorsArr);
  // }
  // function checkInputObj(loginObj) {
  //   for (const key in loginObj) {
  //     console.log(`${key}: ${loginObj[key]}`);
  //     const value = loginObj[key];
  //     console.log('value ===', value);
  //     if (value === '') return true;
  //   }
  // }

  // loginUser(newLoginObj); // TEMP OFF
});
