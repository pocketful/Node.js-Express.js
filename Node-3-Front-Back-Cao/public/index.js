/* 1. Sukurk NodeJS projektą, kuris paduos ir priims žmonių vardus iš array (GET ir POST). Sukurkite atskirą aplanką su front-end'u, tegul jame būna du puslapiai - vienas, su forma paduoti vardą į back-end'ą (Fetch POST); antras puslapis - kuris turi unordered list su visais vardais (Fetch GET).

2. Pakoreguok NodeJS, kad būtų galima pridėti ne tik vardus, bet ir pavardes. Dabar mūsų array saugos ne stringus (["Petras", "Jonas", "Antanas"]), bet obijektus ([{name: "Petras", surname: "Slekys"}, {name: "Jonas", surname: "Kazlauskas"}]). Back-end'e GET request koreguoti nereikės - jis ir taip paduoda visą array ir nesigilina kas jame; tačiau POST jau reikės - štai iš paduoto req.body reikės pasiimti vardą ir pavardę, juos įdėt į objektą, o tą objektą - į array. Front-end'e reikės pakoreguoti, kad forma turėtų du input'us ir juos teisingai atvaizduotų Fetch'o body; taip pat, atvaizduojant, reikės parašyti name + " " + surname, kad atvaizduotų unordered list'e ne objektą, o pilnus vardus tvarkingai. */

const URL = 'http://localhost:3000/';

async function getData() {
    const response = await fetch(URL);
    // console.log(response); 
    if (response.ok) {
        const data = await response.json();
        console.log('data', data);
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
        // liEl.textContent = element;
        liEl.textContent = element.name + ' ' + element.surname;
        ulEl.append(liEl);
    });
}
