async function getPosts() {
  const resp = await fetch('http://localhost:3000/api/posts');
  const postsArr = await resp.json();
  console.log('postsArr ===', postsArr);
  makeList(postsArr, 'post-list');
}
getPosts();

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

function makeList(arr, destId) {
  const dest = document.getElementById(destId);
  dest.innerHTML = '';
  arr.forEach((post) => {
    const li = document.createElement('li');
    li.textContent = `Author: ${post.author} | Title: ${post.title} | Body: ${post.body} | Rating: ${post.rating} `;
    const btnEl = document.createElement('button');
    btnEl.id = post.id;
    btnEl.textContent = 'Delete X';
    btnEl.addEventListener('click', () => deletePost(btnEl.id));
    li.appendChild(btnEl);
    dest.append(li);
  });
}
