const URL = 'http://localhost:3000/api/pets';
const formEl = document.forms[0];

function showFeedback(id) {
  const feedbackEl = document.getElementById('feedback');
  feedbackEl.classList = 'feedback';
  feedbackEl.textContent = '';
  feedbackEl.textContent = `New pet was successfully added with id: ${id} `;
}

async function postPet(name, type, age) {
  const newPetObj = {
    name,
    type,
    age,
  };
  console.log('newPetObj', newPetObj);
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newPetObj),
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
  const typeVal = formEl.type.value;
  const ageVal = Number(formEl.age.value);
  console.log(nameVal, typeVal, ageVal);
  postPet(nameVal, typeVal, ageVal);
});
