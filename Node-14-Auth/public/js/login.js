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
  if (resp.ok) {
    // save token to localStorage
    localStorage.setItem('userToken', data.token);

    feedback('feedback-login', data.message);
    formLogin.reset();

    // sukuria narsykles puslapiu istorijoje nauja irasa nunaviguodamas
    // window.location.href = 'books.html';
    // nunaviguoja, padaro kad negaletume gryzti atgal psl su back
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
