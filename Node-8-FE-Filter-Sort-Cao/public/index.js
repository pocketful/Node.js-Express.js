const URL = 'http://localhost:3000/api';
const filterTypeBtns = document.querySelectorAll('.control button');
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
    console.log('data', data);
    renderPets(data);
  } else {
    console.log('error');
  }
}
getPets('pets/sort-age/asc');

/*
užsikrovus puslapiui, visi mygtukai būtų pažymėti (rekomenduoju susikurti klasę, kuri paryškins mygtuko spalvą). Paspaudus - mygtuklai atsižymi (t.y. klasę nuimi). Priklausomai nuo to, kurie mygtukai pažymėti - tokį vaizdą ir rodo
*/
const activeTypes = ['cat', 'bunny', 'bird'];
// console.log('activeTypes before ===', activeTypes);

filterTypeBtns.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('active')) {
      const index = activeTypes.findIndex((type) => type === button.id);
      // console.log('index ===', index);
      activeTypes.splice(index, 1);
      // console.log('if ===');
    } else {
      activeTypes.push(button.id);
      // console.log('else ===');
    }
    console.log('activeTypes ===', activeTypes);

    // // this was only for single type
    // const type = button.id;
    // getPets(`pets/${type}`);

    // const activeTypesString = activeTypes.toString();
    // console.log('activeTypesString ===', activeTypesString);
    // getPets(`pets/${activeTypesString}/asc`);

    getPets(`pets/${activeTypes}/${sortOrder}`);
    button.classList.toggle('active');
  });
});

ageSortEl.addEventListener('click', () => {
  sortOrder = sortOrder === 'Asc' ? 'Desc' : 'Asc';
  getPets(`pets/${activeTypes}/${sortOrder}`);
  orderDisplayEl.textContent = sortOrder;
});
