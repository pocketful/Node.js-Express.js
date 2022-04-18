const URL = 'http://localhost:3000/api';
const outputEl = document.getElementById('output');
const filterTypeBtns = document.querySelectorAll('.filter-type');

function renderPets(petsArr) {
  outputEl.innerHTML = '';
  const ulEl = document.createElement('ul');
  outputEl.append(ulEl);
  petsArr.forEach((petObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${petObj.name} | ${petObj.type} | ${petObj.age}`;
    ulEl.append(liEl);
  });
}

async function getPets(urlEnd) {
  const response = await fetch(`${URL}/${urlEnd}`);
  if (response.ok) {
    const data = await response.json();
    // console.log('data', data);
    renderPets(data);
  } else {
    console.log('error');
  }
}
getPets('pets');

filterTypeBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.id;
    getPets(`pets/${type}`);
    // console.log(`display ${type}`);
  });
});
