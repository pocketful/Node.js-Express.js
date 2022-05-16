import { getFetch } from './modules/fetch.js';

const booksListEl = document.getElementById('books-list');

// books only for registered users
const token = localStorage.getItem('userToken');
console.log('token ===', token);

if (!token) {
  // if not registered redirect to login
  window.location.replace('index.html');
}

function renderBooks(arr, dest) {
  // const booksListEl = document.getElementById('books-list'); - not pure function
  const outputEl = dest;
  outputEl.innerHTML = '';
  arr.forEach((bookObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = `${bookObj.title} (${bookObj.year})`;
    outputEl.append(liEl);
  });
}

async function getBooks(userToken) {
  const booksArr = await getFetch('books', userToken);
  console.log('booksArr ===', booksArr);
  renderBooks(booksArr, booksListEl);
}
getBooks(token);
// render books to html
