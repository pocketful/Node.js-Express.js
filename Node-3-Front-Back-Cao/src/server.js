/* Pratimas
1. Susikurkite naują node.js pratimą, įsidiekite express/cors.
2. Sukurkite array, kuriame bus saugomi mašinų brand'ai.
3. Sukurkite GET, kuris paduos visą array.
4. Sukurkite POST, kuris į array įrašys naują automobilio brandą.
Testuokite su PostMan. */

const express = require('express');
/* 1. Sukurk NodeJS projektą, kuris paduos ir priims žmonių vardus iš array (GET ir POST). Sukurkite atskirą aplanką su front-end'u, tegul jame būna du puslapiai - vienas, su forma paduoti vardą į back-end'ą (Fetch POST); antras puslapis - kuris turi unordered list su visais vardais (Fetch GET). */

const cors = require('cors');
const app = express();
const PORT = 3000;

// middlewares
app.use(cors()); // prevent CORS error when trying to connect from FrontEnd
app.use(express.json()); // BackEnd can decrypt and see JSON data. Convert JSON to JS

app.listen(PORT, () => console.log('Server is running on port', PORT));

const namesArr = ['Harry', 'Hermione'];

app.get('/', (req, res) => {
    res.json(namesArr);
    console.log(namesArr);
});

app.post('/', (req, res) => {
    const newPostObj = req.body[0];
    console.log('newPostObj ===', newPostObj);
    namesArr.push(newPostObj);
    console.log('namesArr ===', namesArr);
    res.send('OK');
});
