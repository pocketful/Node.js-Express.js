const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { response } = require('express');
const app = express();
const PORT = 3000;

// middlewares
app.use(morgan('tiny'));
app.use(cors()); // prevent CORS error when trying to connect from frontend
// app.use(express.json()); // backend can decrypt and see JSON data. Convert JSON to JS

app.listen(PORT, () => 'Server is live on', PORT);

app.get('/', (req, res) => {
    res.send('<h1>hello express</h1>');
});

/* NUMBERS -------------------------------------------------------------------------------------- */
app.get('/numbers', (req, res) => {
    const { numbers } = require('./db/db');
    console.log('numbers ===', numbers);
    res.json(numbers);
});

// GET /numbers/positive - grazina numbers masyva json formatu is db.js su tik teigiamais skaiciais
app.get('/numbers/positive', (req, res) => {
    // const { numbers } = require('./db/db');
    // res.json(numbers.filter(num => num > 0));    
    const { getPositiveNumbers } = require('./db/db');
    const positiveNumbers = getPositiveNumbers();
    console.log('positiveNumbers ===', positiveNumbers);
    res.json(positiveNumbers);
});

// GET /numbers/max - grazina didziausia reiksme objekto pavidalu {max: 500}
app.get('/numbers/max', (req, res) => {
    const { numbers } = require('./db/db');
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
app.get('/numbers/separate', (req, res) => {
    const { numbers } = require('./db/db');

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
    console.log('separate ===', separate);
    res.json(separate);
});

// GET /numbers/obj-values - grazinam masyva, kuris turi objektus {value: 1}, {value: 12}
app.get('/numbers/obj-values', (req, res) => {
    const { numbers } = require('./db/db');
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
app.get('/numbers/gt/10', (req, res) => {
    const { getNumbersGreaterThan } = require('./db/db');
    const numGreaterThan = getNumbersGreaterThan(10);
    console.log('maxNum ===', numGreaterThan);
    res.json(numGreaterThan);
});

// GET /numbers/gt/:num - grazina masyva kuriame yra sk didesni uz num
app.get('/numbers/gt/:num', (req, res) => {
    const { numbers } = require('./db/db');
    const num = +req.params.num; // convert to a number
    // console.log('num ===', num);
    const numbersGreaterThan = numbers.filter(el => el > num);
    // console.log('numbersGreaterThan ===', numbersGreaterThan);
    res.json(numbersGreaterThan);
});

/* POSTS -------------------------------------------------------------------------------------- */
// GET /posts - grazina posts masyva json formatu is db.js
app.get('/posts', (req, res) => {
    const { posts } = require('./db/db');
    console.log('posts ===', posts);
    res.json(posts);
});

// GET /posts/withCategory - grazina posts masyva su papildoma savybe "category: tech"
app.get('/posts/withCategory', (req, res) => {
    const { posts } = require('./db/db');
    const postsWithCategory = posts.map(postObj => ({
        id: postObj.id,
        title: postObj.title,
        body: postObj.body,
        category: 'tech',
    }));
    console.log('postsWithCategory ===', postsWithCategory);
    res.json(postsWithCategory);
});

// Static way
// // GET /posts/1 - grazina post objekta kurio id yra 1
// app.get('/posts/1', (req, res) => {
//     const { posts } = require('./db/db');
//     const foundPost = posts.find(el => el.id === 1);
//     console.log('foundPost ===', foundPost);
//     res.json(foundPost);
//     // const { getPostById } = require('./db/db');
//     // const postById = getPostById(1);
//     // console.log('postById ===', postById);
//     // res.json(postById);
// });

// Dynamic way
// GET /posts/:postId - grazina post objekta kurio id yra postId
app.get('/posts/:postId', (req, res) => {  // bet kas kas irasyta po post id bus skaitoma kaip id
    const { posts } = require('./db/db');
    // res.json({
    //     msg: 'dynamic',
    //     params: req.params,
    // });
    const id = +req.params.postId; // convert to a number
    const foundPost = posts.find(el => el.id === id);
    // console.log('foundPost ===', foundPost);
    if (foundPost === undefined) {
        res.status(404).json({ error: 'Post not found' });
        return;
    }
    res.json(foundPost);
    // const { getPostById } = require('./db/db');
    // const postById = getPostById(1);
    // console.log('postById ===', postById);
    // res.json(postById);
});

