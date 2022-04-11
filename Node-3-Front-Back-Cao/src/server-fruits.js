/* Pratimas
1. Susikurkite naują node.js pratimą, įsidiekite express/cors.
2. Sukurkite array, kuriame bus saugomi mašinų brand'ai.
3. Sukurkite GET, kuris paduos visą array.
4. Sukurkite POST, kuris į array įrašys naują automobilio brandą.
Testuokite su PostMan. */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// middlewares
app.use(cors()); // prevent CORS error when trying to connect from FrontEnd
app.use(express.json()); // BackEnd can decrypt and see JSON data. Convert JSON to JS

app.listen(PORT, () => console.log('Server is running on port', PORT));

const fruitsArr = ['apple', 'orange', 'pear'];

app.get('/', (req, res) => {
    res.json(fruitsArr);
});

app.post('/api/post', (req, res) => {
    const newPostObj = req.body;
    console.log('newPostObj ===', newPostObj);
    console.log(newPostObj.fruit);
    fruitsArr.push(newPostObj.fruit);
    console.log('fruitsArr ===', fruitsArr);
    res.send('OK');
});
