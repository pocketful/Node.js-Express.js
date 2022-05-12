const BASE_URL = 'http://localhost:3000/api';
const { formLogin } = document.forms;
const { formRegister } = document.forms;

function feedback(output, message, form) {
  const dest = document.getElementById(output);
  dest.innerHTML = '';
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
      // document.getElementById(errObj.path).nextElementSibling.textContent = errObj.message;
      const input = document.querySelector(`#${form} > * > #${errObj.path}`); // #formLogin > * > #email
      input.nextElementSibling.textContent = errObj.message;
      // dest.innerHTML += `* ${errObj.message}<br>`;
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
      feedback('feedback-register', data.message, 'formRegister');
      formRegister.reset();
    } else {
      feedback('feedback-register', data.message, 'formRegister');
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
    feedback('feedback-login', data.message, 'formLogin');
    formLogin.reset();
  } else {
    feedback('feedback-login', data.message, 'formLogin');
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
  const newRegisterObj = {
    email: formRegister.email.value.trim(),
    password: formRegister.password.value.trim(),
    password2: formRegister.password2.value.trim(),
  };
  if (newRegisterObj.password === newRegisterObj.password2) {
    registerUser(newRegisterObj);
  } else {
    // feedback('password2', "Passwords does't match.");
    document.getElementById('password2').nextElementSibling.textContent = "Passwords does't match";
  }
});
