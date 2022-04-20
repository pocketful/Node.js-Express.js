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
    const trEl = tbody.insertRow();

    const tdEl1 = trEl.insertCell();
    tdEl1.textContent = petObj.name;

    const tdEl2 = trEl.insertCell();
    tdEl2.textContent = petObj.type;

    const tdEl3 = trEl.insertCell();
    tdEl3.textContent = petObj.age;

    // const trEl = document.createElement('tr');
    // tbody.append(trEl);
    // const tdEl1 = document.createElement('td');
    // tdEl1.textContent = petObj.name;
    // trEl.append(tdEl1);
    // const tdEl2 = document.createElement('td');
    // tdEl2.textContent = petObj.type;
    // trEl.append(tdEl2);
    // const tdEl3 = document.createElement('td');
    // tdEl3.textContent = petObj.age;
    // trEl.append(tdEl3);
  });
}

async function getPets(urlEnd) {
  const response = await fetch(`${URL}/${urlEnd}`);
  // const response = await fetch(`${URL}/pets/${activeTypes.join(',')}/${sortOrder}`); // cao
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
let activeTypes = ['cat', 'bunny', 'bird'];

filterTypeBtns.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('active')) {
      const index = activeTypes.findIndex((type) => type === button.id);
      activeTypes.splice(index, 1);
    } else {
      activeTypes.push(button.id);
    }
    console.log('activeTypes ===', activeTypes);

    // // this was only for single type
    // const type = button.id;
    // getPets(`pets/${type}`);

    // const activeTypesString = activeTypes.join(','); // cao way
    const activeTypesString = activeTypes.toString();
    console.log('activeTypesString ===', activeTypesString);
    getPets(`pets/${activeTypesString}/${sortOrder}`);
    // getPets(`pets/${activeTypes}/${sortOrder}`); // nzn kodel veikia

    button.classList.toggle('active');
  });
});

ageSortEl.addEventListener('click', () => {
  sortOrder = sortOrder === 'Asc' ? 'Desc' : 'Asc';
  getPets(`pets/${activeTypes}/${sortOrder}`);
  orderDisplayEl.textContent = sortOrder;
});

// Cao way ===========================================================================================================

// <th id="age">Age (Asc)</th>
document.getElementById('age').addEventListener('click', (e) => {
  const text = e.target.textContent; // sortOrder
  if (text.includes('Asc')) {
    e.target.textContent = text.replace('Asc', 'Desc');
    sortOrder = 'Desc';
    // getPets(`pets/${activeTypes}/desc`);
  } else {
    e.target.textContent = text.replace('Desc', 'Asc');
    sortOrder = 'asc';
    // getPets(`pets/${activeTypes}/asc`);
  }
});

document.querySelectorAll('testBtns').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.target.classList.toggle('active');
    const typeClicked = e.target.textContent.toLowerCase();
    if (activeTypes.includes(typeClicked)) {
      activeTypes = activeTypes.filter((type) => type !== typeClicked); // or use remove
    } else {
      activeTypes.push(typeClicked);
    }
    getPets();
  });
});

// async function getPets() {
//   const response = await fetch(`${URL}/pets/${activeTypes.join(',')}/${sortOrder}`);
//   if (response.ok) {
//     const data = await response.json();
//     console.log('data', data);
//     renderPets(data);
//   } else {
//     console.log('error');
//   }
// }
// getPets();
