const URL = 'http://localhost:3000/api';

function renderToHtml(array) {
  const ulEl = document.createElement('ul');
  document.body.append(ulEl);
  array.forEach((user) => {
    const liEl = document.createElement('li');
    liEl.textContent = `Email: ${user.email} | Age: ${user.age} | Gender: ${user.gender} | Has car: ${user.hasCar} | City: ${user.city}`;
    ulEl.append(liEl);
  });
}

async function getData() {
  const response = await fetch(`${URL}/users`);
  // console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log('data', data);
    renderToHtml(data);
  } else {
    console.log('error');
  }
}
getData();
