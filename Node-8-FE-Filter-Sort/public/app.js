const URL = 'http://localhost:3000/api';
const outputEl = document.getElementById('output');
const sortAgeBtn = document.getElementById('sort-age');

let sortOrder = 'DESC';
const orderDisplayEl = sortAgeBtn.querySelector('span');
orderDisplayEl.textContent = sortOrder;

function renderUsers(usersArr) {
  outputEl.innerHTML = '';
  const ulEl = document.createElement('ul');
  outputEl.append(ulEl);
  usersArr.forEach((userObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${userObj.name} is ${userObj.age} years old 
    ${userObj.gender}${userObj.isStudent ? ' student' : ''}.`;
    ulEl.append(liEl);
  });
}

async function getUsers(urlEnd) {
  const response = await fetch(`${URL}/${urlEnd}`);
  if (response.ok) {
    const data = await response.json();
    // console.log('data', data);
    renderUsers(data);
  } else {
    console.log('error');
  }
}
getUsers('users/sort-age/ASC');

sortAgeBtn.addEventListener('click', () => {
  getUsers(`users/sort-age/${sortOrder}`);
  sortOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC';
  orderDisplayEl.textContent = sortOrder;
  console.log('sorting');
});

// /* <ol id="list"></ol>
// const listEl = document.getElementById('list'); */
// function renderUsers2(usersArr) {
//   const listString = usersArr
//     .map(
//       (uObj) => `
//       <li>
//       <p><strong>${uObj.name}</strong> Is ${uObj.age} year old
//       ${uObj.isStudent ? 'student' : ''}. <i>Gender:</i> ${uObj.gender}</p>
//       </li>
//   `,
//     )
//     .join('');
//   listEl.innerHTML = listString;
// }
