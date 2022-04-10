/* 1. Sukurk NodeJS projektą, kuris paduos ir priims žmonių vardus iš array (GET ir POST). Sukurkite atskirą aplanką su front-end'u, tegul jame būna du puslapiai - vienas, su forma paduoti vardą į back-end'ą (Fetch POST); antras puslapis - kuris turi unordered list su visais vardais (Fetch GET).

2. Pakoreguok NodeJS, kad būtų galima pridėti ne tik vardus, bet ir pavardes. Dabar mūsų array saugos ne stringus (["Petras", "Jonas", "Antanas"]), bet obijektus ([{name: "Petras", surname: "Slekys"}, {name: "Jonas", surname: "Kazlauskas"}]). Back-end'e GET request koreguoti nereikės - jis ir taip paduoda visą array ir nesigilina kas jame; tačiau POST jau reikės - štai iš paduoto req.body reikės pasiimti vardą ir pavardę, juos įdėt į objektą, o tą objektą - į array. Front-end'e reikės pakoreguoti, kad forma turėtų du input'us ir juos teisingai atvaizduotų Fetch'o body; taip pat, atvaizduojant, reikės parašyti name + " " + surname, kad atvaizduotų unordered list'e ne objektą, o pilnus vardus tvarkingai. */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// middlewares
app.use(cors()); // prevent CORS error when trying to connect from FrontEnd
app.use(express.json()); // BackEnd can decrypt and see JSON data. Convert JSON to JS

app.listen(PORT, () => console.log('Server is running on port', PORT));

// const namesArr = ['Harry', 'Hermione'];
const fullnameObj = [{name: 'Harry', surname: 'Potter'}, {name: 'Hermione', surname: 'Granger'}];

app.get('/', (req, res) => {
    // res.json(namesArr);
    // console.log(namesArr);
    res.json(fullnameObj);
    console.log(fullnameObj);
});

app.post('/', (req, res) => {
    // const newPostObj = req.body[0];
    const newPostObj = req.body;
    console.log('newPostObj ===', newPostObj);
    fullnameObj.push(newPostObj);
    console.log('fullnameObj ===', fullnameObj);
    // namesArr.push(newPostObj);
    // console.log('namesArr ===', namesArr);
    res.status(201).json({
        success: true,
        message: 'New fullname added',
    });
});
