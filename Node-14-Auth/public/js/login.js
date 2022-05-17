import feedback from './modules/feedback.js';
import { BASE_URL } from './modules/fetch.js';

const { formLogin } = document.forms;

async function loginUser(newLoginObj) {
  console.log('newLoginObj ===', newLoginObj);
  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newLoginObj),
  });
  // console.log('resp ===', resp);
  const data = await resp.json();
  console.log('data ===', data);
  // res.json({ success: true, token, message: 'Login success.' });
  if (resp.ok) {
    // save token to localStorage
    localStorage.setItem('userToken', data.token);

    feedback('feedback-login', data.message);
    formLogin.reset();

    // creates in browsers page history new entry
    // window.location.href = 'books.html';
    // makes sure we can’t go back to the page with the back button
    window.location.replace('books.html');
  } else {
    feedback('feedback-login', data.message);
  }
}

formLogin.addEventListener('submit', (event) => {
  event.preventDefault();
  const newLoginObj = {
    email: formLogin.email.value.trim(),
    password: formLogin.password.value.trim(),
  };
  loginUser(newLoginObj);
});
