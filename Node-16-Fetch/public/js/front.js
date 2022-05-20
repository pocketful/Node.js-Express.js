const BASE_URL = 'http://localhost:3000/api';

const jokeOutputEl = document.getElementById('output');

function showJoke(joke, output) {
  const outputEl = output;
  outputEl.textContent = '';
  outputEl.textContent = joke;
}

async function getJoke(callback) {
  try {
    const resp = await fetch(`${BASE_URL}/joke`);
    const data = await resp.json();
    console.log('data:', data);
    callback(data.joke, jokeOutputEl);
  } catch (err) {
    console.log('err:', err);
  }
}
getJoke(showJoke);

// simple, without callback
// async function getJoke() {
//   try {
//     const resp = await fetch(`${BASE_URL}/joke`);
//     const data = await resp.json();
//     console.log('data:', data);
//     showJoke(data.joke, jokeOutputEl);
//   } catch (err) {
//     console.log('err:', err);
//   }
// }
// getJoke();
