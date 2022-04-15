const URL = 'http://localhost:3000/api';
const outputEl = document.getElementById('output');
const sortAgeBtn = document.getElementById('sortAge');

let sortOrder = 'DESC';
const orderDisplayEl = sortAgeBtn.querySelector('span');
orderDisplayEl.textContent = sortOrder;

function renderToHtml(array) {
  outputEl.innerHTML = '';
  const ulEl = document.createElement('ul');
  outputEl.append(ulEl);
  array.forEach((user) => {
    const liEl = document.createElement('li');
    liEl.textContent = `Email: ${user.email} | Age: ${user.age} | Gender: ${user.gender} | Has car: ${user.hasCar} | City: ${user.city}`;
    ulEl.append(liEl);
  });
}

async function getData(urlEnd) {
  const response = await fetch(`${URL}/${urlEnd}`);
  if (response.ok) {
    const data = await response.json();
    // console.log('data', data);
    renderToHtml(data);
  } else {
    console.log('error');
  }
}
getData('users/sort-age/ASC');

sortAgeBtn.addEventListener('click', () => {
  getData(`users/sort-age/${sortOrder}`);
  sortOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC';
  orderDisplayEl.textContent = sortOrder;
  console.log('sorting');
});
