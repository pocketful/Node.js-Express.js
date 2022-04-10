// Sukurkite NodeJS projektą, kuris GET / paduos automobilių brandus (t.y. array su automobilių brandais: pvz. ["BMW", "VW, "Porsche"]). Su atskiru aplanku, kur bus front-end'as (index.html) pasiimkite šiuos duomenis (naudojant Fetch) ir atvaizduokite juos unordered list'e.

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
