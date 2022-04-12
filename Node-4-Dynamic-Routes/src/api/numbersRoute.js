const express = require('express');
const { numbers } = require('../db/db');
const numbersRoute = express.Router(); //router

module.exports = numbersRoute;

numbersRoute.get('/', (req, res) => {
    console.log('numbers ===', numbers);
    res.json(numbers);
});

// GET /numbers/positive - grazina numbers masyva json formatu is db.js su tik teigiamais skaiciais
numbersRoute.get('/positive', (req, res) => {
    // res.json(numbers.filter(num => num > 0));    
    const { getPositiveNumbers } = require('./db/db');
    const positiveNumbers = getPositiveNumbers();
    console.log('positiveNumbers ===', positiveNumbers);
    res.json(positiveNumbers);
});

// GET /numbers/max - grazina didziausia reiksme objekto pavidalu {max: 500}
numbersRoute.get('/max', (req, res) => {
    // const maxNum = numbers.reduce((max, num) => max > num ? max : num);
    const maxNum = numbers.reduce((maxNum, num) => Math.max(maxNum, num));
    // const { getMaxNumber } = require('./db/db');
    // const maxNum = getMaxNumber();
    console.log('max ===', maxNum);
    res.json({ max: maxNum });
});

/* GET /numbers/separate - 
 {
     positives: []
     negatives: []
 }
*/
numbersRoute.get('/separate', (req, res) => {
    // reduce way
    const separate = numbers.reduce((obj, num) => {
        num >= 0 ? obj.positives.push(num) : obj.negatives.push(num);
        return obj;
    }, { positives: [], negatives: [] }
    );
    // reduce if else
    // const separate = numbers.reduce((obj, num) => {
    //     if (num >= 0) {
    //         obj.positives.push(num);
    //     } else {
    //         obj.negatives.push(num);
    //     }
    //     return obj;
    // }, { positives: [], negatives: [] }
    // );
    // // forEach way
    // const separate = {
    //     positives: [],
    //     negatives: []
    // }
    // numbers.forEach(num => num >= 0 ? separate.positives.push(num) : separate.negatives.push(num));
    // // forEach if else
    // numbers.forEach(num => {
    //     if (num >= 0) {
    //         separate.positives.push(num);
    //     } else {
    //         separate.negatives.push(num);
    //     }
    // });
    res.json(separate);
});

// GET /numbers/obj-values - grazinam masyva, kuris turi objektus {value: 1}, {value: 12}
numbersRoute.get('/obj-values', (req, res) => {
    const numbersObjs = numbers.map(num => {
        return {
            value: num,
        }
    });
    // const numbersObjs = numbers.map(num => ({ value: num, })); // same, my way
    console.log('numbersObjs ===', numbersObjs);
    res.json(numbersObjs);
});

// GET /numbers/gt/10 - grazina masyva kuriame yra sk didesni uz 10
numbersRoute.get('/gt/10', (req, res) => {
    const { getNumbersGreaterThan } = require('./db/db');
    const numGreaterThan = getNumbersGreaterThan(10);
    console.log('maxNum ===', numGreaterThan);
    res.json(numGreaterThan);
});

// GET /numbers/gt/:num - grazina masyva kuriame yra sk didesni uz num
numbersRoute.get('/gt/:num', (req, res) => {
    const num = +req.params.num; // convert to a number
    // console.log('num ===', num);
    const numbersGreaterThan = numbers.filter(el => el > num);
    // console.log('numbersGreaterThan ===', numbersGreaterThan);
    res.json(numbersGreaterThan);
});
