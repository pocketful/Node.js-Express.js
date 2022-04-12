/*  Mes ne vien galim priimti ir paduoti duomenis, tokius, kokie jie yra; tačiau galime juos transformuoti naudojant mūsų pamėgtus JS metodus. 
    - Naujame NodeJS projekte prisidėkite kintamąjį data(..)
    - Pridėję, sukurkite visus šiuos route'us (kiekvienas punktas - atskiras REST route):
* Sukurkite bendrinį GET route, kuris paduos visus duomenis.
* Sukurkite dinaminį GET route, kur URL turės automobilio markę ir pagal ją prafiltruos, ir grąžins tik tuos žmones, kurie turi šį automobilį.
* Sukurkite dinaminį GET route, kuris priims vartotojo id ir pagal jį grąžins atitinkamą vartotojo objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoti.
* Sukurkite GET route, kuris grąžins visus el. paštus (grąžinamas formatas: ["anb@abc.com", "abc@abc.com", "abc@acb.com]).
* Sukurkite GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female) vardą ir pavardę (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]). */

const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;
const { data } = require('./data/data');

// middlewares
// app.use(morgan('tiny'));
app.use(cors()); // prevent CORS error when trying to connect from frontend
// app.use(express.json()); // backend can decrypt and see JSON data. Convert JSON to JS

app.listen(PORT, () => 'Server is live on', PORT);

// Sukurkite bendrinį GET route, kuris paduos visus duomenis.
// http://localhost:3000/
app.get('/', (req, res) => {
    // console.log('data ===', data);
    res.json(data);
});

// Sukurkite dinaminį GET route, kur URL turės automobilio markę ir pagal ją prafiltruos, ir grąžins tik tuos žmones, kurie turi šį automobilį.
// http://localhost:3000/cars/Saturn
app.get('/cars/:brand', (req, res) => {
    const brand = req.params.brand;
    const filteredByCar = data.filter(obj => obj.car === brand);
    res.json(filteredByCar);
})

// Sukurkite dinaminį GET route, kuris priims vartotojo id ir pagal jį grąžins atitinkamą vartotojo objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės konvertuoti.
// http://localhost:3000/byid/5
app.get('/byid/:id', (req, res) => {
    const id = +req.params.id;
    const filteredById = data.filter(obj => obj.id === id);
    res.json(filteredById);
})

// Sukurkite GET route, kuris grąžins visus el. paštus (grąžinamas formatas: ["anb@abc.com", "abc@abc.com", "abc@acb.com]).
// http://localhost:3000/emails
app.get('/emails', (req, res) => {
    const emailsArr = data.map(obj => obj.email);
    res.json(emailsArr);
})

// Sukurkite GET route, į kurį pasikreipus, grąžins visų moterų (gender: Female) vardą ir pavardę (formatas: ["Rita Kazlauskaite", "Monika Simaskaite"]).
// http://localhost:3000/females

// reduce way
app.get("/females", (req, res) => {
    const femaleFullnamesArr = data.reduce((array, obj) => {
        if (obj.gender === 'Female') {
            array.push(obj.first_name + ' ' + obj.last_name);
        }
        return array;
    }, []
    );
    res.json(femaleFullnamesArr);
})

// filter, map 
// app.get("/females", (req, res) => {
//     const femaleFullnamesArr = data
//         .filter(obj => obj.gender === 'Female')
//         .map(obj => obj.first_name + ' ' + obj.last_name);
//      // .map(obj => [obj.first_name, obj.last_name].join(' '));
//     res.json(femaleFullnamesArr);
// });
