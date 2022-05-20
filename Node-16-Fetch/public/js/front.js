// const axios = require('axios').default;

const BASE_URL = 'http://localhost:3000/api';

const jokeOutputEl = document.getElementById('output');
const jokeOutputEl2 = document.getElementById('output2');

function showJoke(joke, output) {
  const outputEl = output;
  outputEl.textContent = joke;
}

async function getJoke(callback) {
  try {
    const resp = await fetch(`${BASE_URL}/joke`);
    console.log('resp:', resp);
    const data = await resp.json();
    if (resp.status >= 400) {
      // status: 500
      throw data.message;
    }
    console.log('data:', data); // data: {success: false, message: 'Something went wrong.'}
    callback(data.joke, jokeOutputEl);
    // if status > 400 then doesn't throw err to catch
  } catch (err) {
    console.log('err:', err);
  }
}
getJoke(showJoke);

async function getJokeAxios() {
  try {
    // eslint-disable-next-line no-undef
    const resp = await axios.get(`${BASE_URL}/joke-axios`); // { data }
    const data = await resp.data;
    console.log('resp:', resp);
    console.log('data:', data);
    showJoke(data.joke, jokeOutputEl2);
    // if status > 400 then throw err to catch
  } catch (err) {
    console.log('err:', err);
    // err: {message: 'Request failed with status code 500', name: 'AxiosError', code: 'ERR_BAD_RESPONSE', config: {…}, request: XMLHttpRequest,…}
  }
}
getJokeAxios(showJoke);

// without callback: we canot move this fn to another place without showJoke fn
// maybe we wat to use showJoke - saveJoke or smthg
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
