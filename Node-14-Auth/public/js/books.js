import { BASE_URL } from './modules/fetch.js';

console.log('books');

// books only for registered users
const token = localStorage.getItem('userToken');
console.log('token ===', token);

if (!token) {
  // if not registered redirect to login
  window.location.replace('index.html');
}

async function getBooks() {
  const resp = await fetch(`${BASE_URL}/books`);
  const data = await resp.json();
  console.log('data ===', data);
}
getBooks();
