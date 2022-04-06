function add(num1, num2) {
    const sum = num1 + num2;
    console.log(`If you add ${num1} and ${num2} you will get ${sum}`);
    return sum;
}

const baseUrl = 'http://localhost:3000';
// console.log({ baseUrl }); === console.log({ baseUrl: baseUrl });



// export default
module.exports = add;

// named export
module.exports = {
    add: add,
    url: baseUrl,
};

// named export, shorter, when key and value are the same
module.exports = {
    add,
    baseUrl,
};