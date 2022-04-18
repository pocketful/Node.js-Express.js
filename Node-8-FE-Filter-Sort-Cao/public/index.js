const URL = 'http://localhost:3000/api';
const filterTypeBtns = document.querySelectorAll('.filter-type');
const ageSortEl = document.getElementById('age-th');

let sortOrder = 'Asc';
const orderDisplayEl = ageSortEl.querySelector('span');
orderDisplayEl.textContent = sortOrder;

function renderPets(petsArr) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  petsArr.forEach((petObj) => {
    const trEl = document.createElement('tr');
    tbody.append(trEl);
    const tdEl1 = document.createElement('td');
    tdEl1.textContent = petObj.name;
    trEl.append(tdEl1);
    const tdEl2 = document.createElement('td');
    tdEl2.textContent = petObj.type;
    trEl.append(tdEl2);
    const tdEl3 = document.createElement('td');
    tdEl3.textContent = petObj.age;
    trEl.append(tdEl3);
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
getPets('pets/sort-age/asc');

ageSortEl.addEventListener('click', () => {
  sortOrder = sortOrder === 'Asc' ? 'Desc' : 'Asc';
  getPets(`pets/sort-age/${sortOrder}`);
  orderDisplayEl.textContent = sortOrder;
});

filterTypeBtns.forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.id;
    getPets(`pets/${type}`);
  });
});
