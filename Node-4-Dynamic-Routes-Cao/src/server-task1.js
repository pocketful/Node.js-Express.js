const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;

// middlewares
// app.use(morgan('tiny'));
app.use(cors()); // prevent CORS error when trying to connect from frontend
// app.use(express.json()); // backend can decrypt and see JSON data. Convert JSON to JS

app.listen(PORT, () => 'Server is live on', PORT);


// static
// app.get('/bmw', (req, res) => {
//     res.send(["i3", "i8", "1 series", "3 series", "5 series"]);
// });

/* Pasirašyk NodeJS projektą, kuriame yra tik vienas GET request, kuris turi dinaminę nuorodą - paima automobilio markę (pvz. /cars/:brand). Pagal markę, paduoda/grąžina (su response) atitinkamą array iš cars objekto. */

// dynamic
// http://localhost:3000/cars/mb
app.get("/cars/:brand", (req, res) => {
    const cars = {
        bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
        mb: ["A class", "C class", "E class", "S class"],
        vw: ["Golf", "Arteon", "UP"]
    }
    const brand = req.params.brand;
    res.json(cars[brand]);
})
