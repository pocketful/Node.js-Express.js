import { getFetch } from './modules/fetch.js';

const articlesEl = document.getElementById('articles');

// articles only for logged in users
const token = localStorage.getItem('userToken');
console.log('token ===', token);

if (!token) {
  // if not logged in redirect to register
  // creates in browsers page history new entry:
  // window.location.href = 'register.html';
  // makes sure we can’t go back to the page with the back button:
  window.location.replace('register.html');
}

function createEl(el, text, output) {
  const newEl = document.createElement(el);
  newEl.textContent = text;
  output.append(newEl);
}

function renderArticles(arr, output) {
  const outputEl = output;
  outputEl.innerHTML = '';

  arr.forEach((articleObj) => {
    const articleEl = document.createElement('div');
    outputEl.append(articleEl);
    createEl('h2', articleObj.title, articleEl);
    createEl('p', articleObj.content, articleEl);
    // const h2El = document.createElement('h2');
    // h2El.textContent = articleObj.title;
    // articleEl.append(h2El);
    // const pEl = document.createElement('p');
    // pEl.textContent = articleObj.content;
    // articleEl.append(pEl);
  });
}

async function getArticles(userToken) {
  try {
    const articlesArr = await getFetch('articles', userToken);
    console.log('articlesArr ===', articlesArr);
    renderArticles(articlesArr, articlesEl);
  } catch (err) {
    console.log('err in getArticles:', err);
  }
}
getArticles(token);
