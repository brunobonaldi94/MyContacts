const cors = ((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // allow different origins
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // allow to add some verbs
  response.setHeader('Access-Control-Allow-Headers', '*'); // allow to add any heade
  response.setHeader('Access-Control-Max-Age', '10'); // cache preflight request for 10 seconds
  next();
});

module.exports = cors;
