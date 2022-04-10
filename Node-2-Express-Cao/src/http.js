// https://www.w3schools.com/nodejs/nodejs_http.asp
// Node.js HTTP Module (server without Express)

// http://localhost:8080
// node http.js

// to include a module, use the require() function with the name of the module:
const http = require('http'); // import http into our JS code
// now your application has access to the HTTP module, and is able to create a server

// createServer method creates a server on your computer, that will receive and response (create a server object)

// w3schools
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' }); // add a HTTP header // if the response from the HTTP server is supposed to be displayed as HTML, you should include an HTTP header with the correct content type
  // The first argument of the res.writeHead() method is the status code, 200 means that all is OK, the second argument is an object containing the response headers

  res.write(req.url); // The function passed into the http.createServer() has a req argument that represents the request from the client, as an object (http.IncomingMessage object). This object has a property called "url" which holds the part of the url that comes after the domain name
  // http://localhost:8080/summer => Will produce this result: /summer
  // http://localhost:8080/winter => Will produce this result: /winter

  res.write('Hello World!'); // write a response to the client
  res.end(); // end the response

}).listen(8080); // the server object listens on port 8080

// The function passed into the http.createServer() method, will be executed when someone tries to access the computer on port 8080


// 2 way, cao
http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
  });
}).listen(8080); // activates this server, listening on port 8080
