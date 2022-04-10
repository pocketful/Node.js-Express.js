const URL = 'http://localhost:3000/';

const formEl = document.forms[0];

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameVal = formEl.name.value.trim();
    console.log('nameVal', nameVal);
    postData(nameVal);
});

async function postData(name) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify([name]),
    });
}
