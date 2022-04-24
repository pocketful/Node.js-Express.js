const URL = 'http://localhost:3000/api/services';
const formEl = document.forms.formSer;

function showFeedback(result) {
  const feedbackEl = document.getElementById('feedback');
  feedbackEl.innerHTML = '';
  const pEl = document.createElement('p');
  pEl.classList = 'feedback';
  if (result === 'success') {
    pEl.textContent = 'New service was successfully added.';
  } else {
    pEl.textContent = 'Error trying to add new service.';
  }
  feedbackEl.append(pEl);
  setTimeout(() => {
    pEl.remove();
  }, 3000);
}

async function addService(name, price, description) {
  const newServiceObj = {
    name,
    price,
    description,
  };
  // console.log('newServiceObj ===', newServiceObj);
  try {
    const resp = await fetch(URL, {
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
      console.log('suc');
      showFeedback('success');
      // setTimeout(() => window.location.href = 'index.html', 3000);
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
  const priceVal = Number(formEl.price.value);
  const descriptionVal = formEl.description.value.trim();
  // console.log(nameVal, priceVal, descriptionVal);
  addService(nameVal, priceVal, descriptionVal);
});
