const COLORS_URL = 'http://localhost:3000/api/colors';
const COLOR_URL = 'http://localhost:3000/api/colors/1'; // one color
// Access to fetch at 'http://localhost:3000/api/colors' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy ---different ports
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
https://www.npmjs.com/package/cors

document.getElementById('colors').onclick = getColors;
// document.getElementById('colors').onclick = getColor;  // one color

async function getColors() {
    const response = await fetch(COLORS_URL);
    console.log('response ===', response);
    const data = await response.json();
    console.log('data ===', data);
    if (data.success) {
        data.colors.forEach(color => console.log(color));
    } else {
        console.log(data.error);
    }
}

 // one color
async function getColor() {
    const response = await fetch(COLOR_URL);
    console.log('response ===', response);
    const data = await response.json();
    console.log('data ===', data);
}
