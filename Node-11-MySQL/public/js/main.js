function makeList(arr, destId) {
  const dest = document.getElementById(destId);
  dest.innerHTML = '';
  arr.forEach((post) => {
    const li = document.createElement('li');
    li.textContent = `Author: ${post.author} | Title: ${post.title} | Body: ${post.body} | Rating: ${post.rating} `;
    const btnEl = document.createElement('button');
    btnEl.textContent = 'Delete X';
    li.appendChild(btnEl);
    dest.append(li);
  });
}

async function getPosts() {
  const resp = await fetch('http://localhost:3000/api/posts');
  const postsArr = await resp.json();
  console.log('postsArr ===', postsArr);
  makeList(postsArr, 'post-list');
}
getPosts();

// delete function
async function deletePost(delId) {
  const resp = await fetch(`http://localhost:3000/api/posts/${delId}`, {
    method: 'DELETE',
  });
  console.log('resp ===', resp);
  if (resp.ok) {
    getPosts();
  }
  console.log('data ===', await resp.json());
}

const btn11El = document.getElementById('del20');
btn11El.addEventListener('click', () => {
  console.log('deleting');
  deletePost(20);
});
