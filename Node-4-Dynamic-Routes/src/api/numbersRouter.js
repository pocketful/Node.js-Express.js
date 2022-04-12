const express = require('express');
const { numbers } = require('../db/db');

const numbersRouter = express.Router(); // router

module.exports = numbersRouter;

numbersRouter.get('/', (req, res) => {
  console.log('numbers ===', numbers);
  res.json(numbers);
});

// GET /numbers/positive - grazina numbers masyva json formatu is db.js su tik teigiamais skaiciais
numbersRouter.get('/positive', (req, res) => {
  res.json(numbers.filter((num) => num > 0));
});

// GET /numbers/max - grazina didziausia reiksme objekto pavidalu {max: 500}
numbersRouter.get('/max', (req, res) => {
  // const maxNumber = numbers.reduce((maxNum, num) => maxNum > num ? maxNum : num);
  const maxNumber = numbers.reduce((maxNum, num) => Math.max(maxNum, num));
  res.json({ max: maxNumber });
});

// GET /numbers/separate - { positives: [] negatives: [] }
numbersRouter.get('/separate', (req, res) => {
  const separate = numbers.reduce((obj, num) => {
    // eslint-disable-next-line no-unused-expressions
    num >= 0 ? obj.positives.push(num) : obj.negatives.push(num);
    return obj;
  }, { positives: [], negatives: [] });

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
  // // forEach
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
numbersRouter.get('/obj-values', (req, res) => {
  res.json(numbers.map((num) => ({ value: num })));
});

// GET /numbers/gt/:num - grazina masyva kuriame yra sk didesni uz num
numbersRouter.get('/gt/:num', (req, res) => {
  const num = +req.params.num; // convert to a number
  res.json(numbers.filter((el) => el > num));
});
