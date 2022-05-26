const URL = 'http://localhost:3000/api';

function renderBooks(booksArr) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  booksArr.forEach((bookObj) => {
    const trEl = document.createElement('tr');
    tbody.append(trEl);
    const tdEl1 = document.createElement('td');
    tdEl1.textContent = bookObj.title;
    trEl.append(tdEl1);
    const tdEl2 = document.createElement('td');
    tdEl2.textContent = bookObj.year;
    trEl.append(tdEl2);
    const tdEl3 = document.createElement('td');
    tdEl3.textContent = bookObj.rating;
    trEl.append(tdEl3);
  });
}

async function getBooks(urlEnd) {
  const response = await fetch(`${URL}/${urlEnd}`);
  if (response.ok) {
    const data = await response.json();
    // console.log('data', data);
    renderBooks(data);
  } else {
    console.log('error');
  }
}
getBooks('books/');
