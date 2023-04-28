// eslint-disable-next-line no-unused-vars
module.exports = ((error, request, response, next) => {
  console.log(error);
  response.status(500).json({ message: 'Internal Server Error' });
});
