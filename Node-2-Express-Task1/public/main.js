const POSTS_URL = 'http://localhost:3000/posts';
const CITY_URL = 'http://localhost:3000/api/city';
const output = document.getElementById('output');

document.getElementById('posts').onclick = getPosts;
document.getElementById('city').onclick = getCity;

async function getPosts() {
    const response = await fetch(POSTS_URL);
    // console.log('response posts ===', response);
    const data = await response.json();
    // console.log('data posts ===', data);
    output.innerHTML = '';
    data.forEach(post => {
        output.innerHTML += `
        <div class="result">  
          <h3>${post.id}. ${post.title}</h3>
          <p><strong>Message:</strong> ${post.body}</p>
        </div>
    `});
}

async function getCity() {
    const response = await fetch(CITY_URL);
    // console.log('response city ===', response);
    const data = await response.json();
    // console.log('data city ===', data);
    output.innerHTML = '';
    output.innerHTML = `<p class="result"><strong>City:</strong> ${data}</p>`;
}
