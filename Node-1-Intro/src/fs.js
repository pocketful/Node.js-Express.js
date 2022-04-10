// https://www.w3schools.com/nodejs/nodejs_filesystem.asp
// node js core module, no path needed
const fs = require('fs');
console.log('fs ===', fs);

/* WRITE --------------------------------------------------------- */
// writeFileSync have to wait till the code is done
function write() { // write(path)
    fs.writeFile('../dist/style.css', 'Username=James\nage=25', (err) => {
        // fs.writeFile('./new.txt', 'Username=James\nage=25', (err) => {
        // if (err) {
        //     console.warn(err);
        // } else {
        //     console.log('file created');
        // }
        if (err) {
            console.warn(err);
            return;
        }
        console.log('file created');
    });
}
// write();

/* READ --------------------------------------------------------- */
const read = () => {  // read = (path)
    fs.readFile('./new.txt', (err, data) => {
        if (err) {
            console.warn(err);
            return;
        }
        console.log('data ===', data.toString());
    });
}
// read();

/* DELETE --------------------------------------------------------- */
const deleteFile = (fileName) => {
    if (fs.existsSync(fileName)) {  // won't take long to find out if it exist, so we can use Sync ver
        console.log('file found');
        fs.unlink(fileName, (err) => {  // delete file
            if (err) {
                console.warn(err);
                return;
            }
            console.log(`${fileName} deleted`);
        });
    } else {
        console.log(fileName, 'not found');
    }
}
// deleteFile('./deleteMe.txt');
deleteFile('deleteMe.txt'); // when in the same dir it's okay to name it like that


/* --------------------------------------------------------- */
// traditional fn example instead of arrow
function write() { // write(path)
    fs.writeFile('../dist/style.css', 'Username=James\nage=25', function (err) {
        console.log(err);
    });
}
/* --------------------------------------------------------- */

// https://nodejs.org/api/fs.html#fsreadfilepath-options-callback
import { readFile } from 'fs';
readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});