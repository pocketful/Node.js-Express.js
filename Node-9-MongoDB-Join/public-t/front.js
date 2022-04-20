const BASE_URL = 'http://localhost:3000/api';

const listEl = document.getElementById('books');

function render(booksAuthorsArr) {
  listEl.innerHTML = booksAuthorsArr
    .map((bookObj) => `<li>${bookObj.title} (${bookObj.year}) by <strong>${bookObj.author}</strong></li>`)
    .join('');
}

async function getBooksAuthors(resource) {
  const resp = await fetch(`${BASE_URL}/${resource}`);
  const dataInJs = await resp.json();
  console.log(dataInJs);
  render(dataInJs);
}
getBooksAuthors('books-authors');
