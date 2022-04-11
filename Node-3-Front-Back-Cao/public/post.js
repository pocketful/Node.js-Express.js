/* 1. Sukurk NodeJS projektą, kuris paduos ir priims žmonių vardus iš array (GET ir POST). Sukurkite atskirą aplanką su front-end'u, tegul jame būna du puslapiai - vienas, su forma paduoti vardą į back-end'ą (Fetch POST); antras puslapis - kuris turi unordered list su visais vardais (Fetch GET).

2. Pakoreguok NodeJS, kad būtų galima pridėti ne tik vardus, bet ir pavardes. Dabar mūsų array saugos ne stringus (["Petras", "Jonas", "Antanas"]), bet obijektus ([{name: "Petras", surname: "Slekys"}, {name: "Jonas", surname: "Kazlauskas"}]). Back-end'e GET request koreguoti nereikės - jis ir taip paduoda visą array ir nesigilina kas jame; tačiau POST jau reikės - štai iš paduoto req.body reikės pasiimti vardą ir pavardę, juos įdėt į objektą, o tą objektą - į array. Front-end'e reikės pakoreguoti, kad forma turėtų du input'us ir juos teisingai atvaizduotų Fetch'o body; taip pat, atvaizduojant, reikės parašyti name + " " + surname, kad atvaizduotų unordered list'e ne objektą, o pilnus vardus tvarkingai. */

const URL = 'http://localhost:3000/api/post';

const formEl = document.forms[0];

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameVal = formEl.name.value.trim();
    const surnameVal = formEl.surname.value.trim();
    postData(nameVal, surnameVal);
});

async function postData(name, surname) {
    const newFullnameObj = {
        name,
        surname,
    };
    console.log('newFullnameObj', newFullnameObj);
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        // body: JSON.stringify([name]),
        body: JSON.stringify(newFullnameObj),
    });
    const data = await response.json();
    console.log('data ===', data);
    if (data.success) {
        formEl.reset();
        showFeedback(data.message);
    } else {
        showFeedback('Error. Try again');
    }
};

function showFeedback(message) {
    const feedbackEl = document.getElementById('feedback');
    feedbackEl.classList = 'feedback';
    feedbackEl.innerHTML = '';
    feedbackEl.innerHTML = message;
}
