// https://www.npmjs.com/package/date-fns
// https://date-fns.org/docs/Getting-Started/


/* ------------------------------------------------------------------------------------------- */
// https://date-fns.org/v2.28.0/docs/formatDistanceToNow
// Return the distance between the given date and now in words.

const formatDistanceToNow = require('date-fns/formatDistanceToNow');
console.log(formatDistanceToNow); // [Function: formatDistanceToNow]
console.log(formatDistanceToNow(new Date(2014, 6, 2), { addSuffix: true })); // almost 8 years ago

// If today is 6 April 2022, what is the distance to 2 July 2014?
var result = formatDistanceToNow(
    new Date(2014, 6, 2)
)
console.log('formatDistanceToNow ===', result); // almost 8 years ago


// /* ------------------------------------------------------------------------------------------- */
// https://date-fns.org/v2.28.0/docs/add
// Add the specified years, months, weeks, days, hours, minutes and seconds to the given date.

const add = require('date-fns/add');

// Add the following duration to 1 September 2014, 10:19:50
const result2 = add(new Date(2014, 8, 1, 10, 19, 50), {
    years: 2,
    months: 9,
    weeks: 1,
    days: 7,
    hours: 5,
    minutes: 9,
    seconds: 30,
  })
  console.log('add ===', result2); // 2017-06-15T12:29:20.000Z
  //=> Thu Jun 15 2017 15:29:20
  