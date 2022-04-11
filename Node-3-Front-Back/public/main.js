const POSTS_URL = 'http://localhost:3000/api/posts';
const output = document.getElementById('output');

// document.getElementById('posts').onclick = getPosts;
document.getElementById('new-post').onclick = newPost;


async function newPost() {
    const newPostData = { 
        title: 'Best Node',
        body: 'Blaaaa',
    };
    const response = await fetch(POSTS_URL, {       
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newPostData),
    });
    // console.log('newPostData ===', newPostData);
    const data = await response.json();
    console.log('data ===', data);
}
