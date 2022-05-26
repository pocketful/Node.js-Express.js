## How to Install and Run the Project

Install Node.js 17.8.0 with npm 8.6.0 from [https://nodejs.org/](https://nodejs.org/en/download/releases/)

- npm init -y
- npm install express // npm i express@4.17.3 // https://www.npmjs.com/package/express
- npm install cors // npm i cors@2.8.5 // https://www.npmjs.com/package/cors
  // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
  // https://www.npmjs.com/package/cors

globaliai instalint:
// automatically restarting the node application when file changes
// npm i nodemon  // https://www.npmjs.com/package/nodemon

## Scripts

- start => npm start
- all others => npm run allothers

## Terms

1. REST - restful state transfer. Standartas kaip aplikacijos bendrauja tarpusavyje.
2. API - application programing interface.
3. Resource - informacijos vienetas, grupe. pvz posts, comments, book.
4. Request - siunciama uzklausa is kliento Node (BE). Gali tureti parametrus ir body.
5. Response - musu atsakymas i request'a. Pranesti apie klaida, nustatyti http koda

## Request

GET https://jsonplaceholder.typicode.com/api/users/

- GET - http metodas
- host - https://jsonplaceholder.typicode.com/
- /api/users/ - endpoint
- users - resursas
