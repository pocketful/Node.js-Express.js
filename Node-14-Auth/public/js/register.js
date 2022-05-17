import { feedback, clearFeedback, passwordFeedback } from './modules/feedback.js';
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
    if (resp.ok) formRegister.reset();
    feedback('feedbackReg', data.message);
  } catch (error) {
    console.log('error ===', error);
  }
}

formRegister.addEventListener('submit', (event) => {
  event.preventDefault();
  const newRegisterObj = {
    email: formRegister.email.value.trim(),
    password: formRegister.password.value.trim(),
    password2: formRegister.password2.value.trim(),
  };
  clearFeedback('feedbackReg');
  if (newRegisterObj.password === newRegisterObj.password2) {
    registerUser(newRegisterObj);
  } else {
    passwordFeedback();
  }
});
