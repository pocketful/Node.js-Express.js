const numbers = [1, 15, 9, -9, -8, -7, 2, 8, 51, 6, 5];

const posts = [
  {
    id: 1,
    title: 'Post 1',
    body: 'This is Post 1 body and it is all about Post 1',
  },
  {
    id: 2,
    title: 'Post 2',
    body: 'This is Post 2 body and it is all about Post 2',
  },
  {
    id: 3,
    title: 'Post 3',
    body: 'This is Post 3 body and it is all about Post 3',
  },
  {
    id: 4,
    title: 'ExpressJs',
    body: 'Express is easy way to make back end',
  },
];

function getPositiveNumbers() {
    const positiveNumbersArr = numbers.filter(num => num > 0);
    console.log('positiveNumbersArr ===', positiveNumbersArr);
    return positiveNumbersArr;
}

function getMaxNumber() {
    const maxNum = numbers.reduce((total, num) => total > num ? total : num);
    console.log('maxNum ===', maxNum);
    return maxNum;
}

function getNumbersGreaterThan(x) {
    const numbersGreaterThan = numbers.filter(num => num > x);
    console.log(`numbersGreaterThan ${x} === ${numbersGreaterThan}`);
    return numbersGreaterThan;
}

function getPostById(id) {
    const postById = posts.find(el => el.id === id);
    console.log(`postById ${id} === ${postById}`);
    return postById;
    // return postById ? postById : false;
}

function getPostByTitle(title) {
    const postByTitle = posts.find(el => el.title === title);
    console.log(`postByTitle ${title} === ${postByTitle}`);
    return postByTitle ? postByTitle : false;
}

module.exports = {
    numbers,
    posts,
    getPositiveNumbers,
    getMaxNumber,
    getNumbersGreaterThan,
    getPostById
    // getPostByTitle
}