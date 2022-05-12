const BASE_URL = 'http://localhost:3000/api';
const { formLogin } = document.forms;
const { formRegister } = document.forms;

function feedback(output, message) {
  const dest = document.getElementById(output);
  dest.innerHTML = '';
  if (typeof message === 'string') {
    dest.textContent = message;
  }
  if (Array.isArray(message)) {
    message.forEach((errObj) => {
      dest.innerHTML += `* ${errObj.message}<br>`;
    });
  }
}

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
    console.log('response ===', resp);
    const data = await resp.json();
    console.log('data ===', data);
    if (resp.ok) {
      feedback('feedback-register', data.message);
      formRegister.reset();
    } else {
      feedback('feedback-register', data.message);
    }
  } catch (error) {
    console.log('error ===', error);
  }
}

async function loginUser(newLoginObj) {
  console.log('newLoginObj ===', newLoginObj);
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
  if (resp.ok) {
    feedback('feedback-login', data.message);
    formLogin.reset();
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

formRegister.addEventListener('submit', (event) => {
  event.preventDefault();
  const password = formRegister.password.value.trim();
  const password2 = formRegister.password2.value.trim();
  if (password === password2) {
    const newRegisterObj = {
      email: formRegister.email.value.trim(),
      password,
    };
    registerUser(newRegisterObj);
  } else {
    feedback('feedback-register', "Passwords does't match");
  }
});
