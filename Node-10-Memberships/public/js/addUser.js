const BASE_URL = 'http://localhost:3000/api';
const formEl = document.forms.formUser;

function showFeedback(result) {
  const feedbackEl = document.getElementById('feedback-user');
  feedbackEl.innerHTML = '';
  const pEl = document.createElement('p');
  pEl.classList = 'feedback';
  if (result === 'success') {
    pEl.textContent = 'New user was successfully added.';
  } else {
    pEl.textContent = 'Error trying to add new user.';
  }
  feedbackEl.append(pEl);
  //   setTimeout(() => {
  //     pEl.remove();
  //   }, 3000);
}

async function addUser(name, surname, email, serviceIdStr) {
  const newServiceObj = {
    name,
    surname,
    email,
    serviceIdStr,
  };
  // console.log('newServiceObj ===', newServiceObj);
  try {
    const resp = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newServiceObj),
    });
    console.log('response ===', resp);
    const data = await resp.json();
    console.log('data ===', data);
    if (data.acknowledged) {
      formEl.reset();
      showFeedback('success');
      setTimeout(() => (window.location.href = 'users.html'), 3000);
    } else {
      showFeedback('error');
    }
  } catch (error) {
    console.log('error ===', error);
    console.log('error');
  }
  // if (data.acknowledged) {
  //   formEl.reset();
  //   console.log('suc');
  //   showFeedback('success');
  // } else {
  //   console.log('data ===', data);
  //   // console.log(error);
  //   // showFeedback('error');
  // }
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameVal = formEl.name.value.trim();
  const surnameVal = formEl.surname.value.trim();
  const emailVal = formEl.email.value.trim();
  const serviceIdStrVal = formEl.serviceSelect.value.trim();
  console.log(nameVal, surnameVal, emailVal, serviceIdStrVal);
  addUser(nameVal, surnameVal, emailVal, serviceIdStrVal);
});

/* -------------------------------------------------------------------------------------------------- */
// gauti services ir is ju suformuoti select input lauka su options
function createSelectOptions(servicesArr) {
  const selectEl = document.getElementById('serviceSelect');
  servicesArr.forEach((service) => {
    const optionEl = document.createElement('option');
    // eslint-disable-next-line no-underscore-dangle
    optionEl.value = service._id;
    optionEl.text = service.name.charAt(0).toUpperCase() + service.name.substring(1); // Capitalize first letter
    selectEl.append(optionEl);
  });
}

async function getSelectOptionsData() {
  try {
    const resp = await fetch(`${BASE_URL}/services`);
    // console.log(resp);
    if (!resp.ok) throw new Error('Something is wrong in get services');
    const servicesArr = await resp.json();
    console.log('servicesArr', servicesArr);
    createSelectOptions(servicesArr);
  } catch (error) {
    console.log('error ===', error);
  }
}
getSelectOptionsData();

// fetch(`${BASE_URL}/services`)
//   .then((respe) => resp.json())
//   .then((data) => createOptions(data))
//   .catch((error) => console.log(error.message));

/*
// create not only options, bet also select, label
// const selectSerEl = document.querySelector('.fUser__select');
// create select element
function createOptions(array) {
  // create label
  const labelEl = document.createElement('label');
  labelEl.htmlFor = 'serviceSelect';
  labelEl.textContent = 'Change membership';
  selectSerEl.append(labelEl);
  // create select
  const selectEl = document.createElement('select');
  selectEl.id = 'serviceSelect';
  selectSerEl.append(selectEl);

  // create options for a select
  array.forEach((service) => {
    createSelectOption(service.name, selectEl);
  });
}

// create options for a select
function createSelectOption(serviceName, selectEl) {
  const optionEl = document.createElement('option');
  optionEl.value = serviceName;
  optionEl.text = serviceName.charAt(0).toUpperCase() + serviceName.substring(1); // Capitalize first letter
  selectEl.append(optionEl);
}
*/
