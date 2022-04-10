const URL = 'http://localhost:3000/';

async function getData() {
    const response = await fetch(URL);
    // console.log(response); 
    if (response.ok) {
        const data = await response.json();
        renderToHtml(data);
    }
    else {
        console.log('error');
    }
};
getData();

function renderToHtml(array) {
    const ulEl = document.createElement('ul');
    document.body.append(ulEl);
    array.forEach(element => {
        let liEl = document.createElement('li');
        liEl.textContent = element;
        ulEl.append(liEl);
    });
}
