module.exports = ((request, response, next) => {
  const allowOrigins = ['http://localhost:3000', 'http://localhost:3002', 'http://192.168.15.5:3000'];
  const origin = request.header('origin');
  const isAllowedOrigin = allowOrigins.includes(origin);
  if (isAllowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', origin); // allow different origins
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // allow to add some verbs
    response.setHeader('Access-Control-Allow-Headers', '*'); // allow to add any heade
    response.setHeader('Access-Control-Max-Age', '10'); // cache preflight request for 10 seconds
  }

  next();
});
