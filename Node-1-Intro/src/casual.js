// import casual
const casual = require('casual');

console.log('casual.sentence ===', casual.sentence);
// node src/casual.js

/* ------------------------------------------------------------- */
// funkcijos pagalba sugeneruoti random adressa is casual
const randomAddress = () => {
    return casual.address;
}
console.log('randomAddress() ===', randomAddress());

/* ------------------------------------------------------------- */
// funkcija turetu grazinti objekta kuris turi country, city, state, address
function generateAddress() {
    return {
        country: casual.country,
        city: casual.city,
        state: casual.state,
        address: casual.address
    }
}
console.log('generateAddress() ===', generateAddress());

/* ------------------------------------------------------------- */
// casual.js sukuriam funkcija kuri generuoja useri su 3 savybem
// exportuojam ta funkcija ir panaudojam ja index.js
function generateUser() {
    return {
        firstName: casual.first_name,
        lastName: casual.last_name,
        phone: casual.phone
    }
}
// console.log('generateUser() ===', generateUser();
module.exports = { generateUser };

/* ------------------------------------------------------------- */
// date, time
const date1 = casual.date(format = 'YYYY-MM-DD')  // '2001-07-06' (see available formatters http://momentjs.com/docs/#/parsing/string-format/)
const time1 = casual.time(format = 'HH:mm:ss')    // '03:08:02' (see available formatters http://momentjs.com/docs/#/parsing/string-format/)

console.log('date ===', date1);
console.log('time ===', time1);
console.log('casual.moment  ===', casual.moment); // moment.js object see http://momentjs.com/docs/ 



