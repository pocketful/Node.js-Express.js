const BASE_URL = 'http://localhost:3000/api';
const { formLogin } = document.forms;
const { formRegister } = document.forms;

function feedback(output, message) {
  const dest = document.getElementById(output);
  dest.innerHTML = '';
  dest.textContent = message;
}

async function registerUser(email, password) {
  const newPostObj = {
    email,
    password,
  };
  console.log('newPostObj ===', newPostObj);
  try {
    const resp = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newPostObj),
    });
    console.log('response ===', resp);
    const data = await resp.json();
    console.log('data ===', data);
    if (resp.ok) {
      feedback('feedback-register', data);
      formRegister.reset();
    } else {
      feedback('feedback-register', data);
    }
  } catch (error) {
    console.log('error ===', error);
  }
}

async function loginUser(email, password) {
  const newPostObj = {
    email,
    password,
  };
  console.log('newPostObj ===', newPostObj);
  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newPostObj),
  });
  console.log('resp ===', resp);
  const data = await resp.json();
  console.log('data ===', data);
  if (resp.ok) {
    feedback('feedback-login', data);
    formLogin.reset();
  } else {
    feedback('feedback-login', data.error);
  }
}

formLogin.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailVal = formLogin.email.value.trim();
  const passwordVal = formLogin.password.value.trim();
  console.log(emailVal, passwordVal);
  loginUser(emailVal, passwordVal);
});

formRegister.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailVal = formRegister.email.value.trim();
  const passwordVal = formRegister.password.value.trim();
  console.log(emailVal, passwordVal);
  registerUser(emailVal, passwordVal);
});
