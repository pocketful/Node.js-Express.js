const URL = 'http://localhost:3000/api/books';
const formEl = document.forms[0];

function showFeedback(id) {
  const feedbackEl = document.getElementById('feedback');
  feedbackEl.classList = 'feedback';
  feedbackEl.textContent = '';
  feedbackEl.textContent = `New book was successfully added with id: ${id} `;
}

async function postUser(name, age, isStudent, gender, city) {
  const newUserObj = {
    name,
    age,
    isStudent,
    gender,
    city,
  };
  // console.log('newUserObj', newUserObj);
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newUserObj),
  });
  const data = await response.json();
  console.log('data ===', data);
  if (data.acknowledged) {
    formEl.reset();
    showFeedback(data.insertedId);
  } else {
    showFeedback('Error. Try again');
  }
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameVal = formEl.name.value.trim();
  const ageVal = Number(formEl.age.value);
  const genderVal = formEl.gender.value.trim();
  const cityVal = formEl.city.value.trim();
  const isStudentVal = formEl.isStudent.checked;
  // console.log(nameVal, ageVal, isStudentVal, genderVal, cityVal);
  postUser(nameVal, ageVal, isStudentVal, genderVal, cityVal);
});
