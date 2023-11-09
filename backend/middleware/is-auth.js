require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Authentication header is missing.');
    error.statusCode = 401;
    next(error);
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    const error = new Error('Token not found in the authorization header.');
    error.statusCode = 401;
    next(error);
    return;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.message = 'Token verification failed. Please provide a valid token.';
    err.statusCode = 500;
    next(err);
    return;
  }
  if (!decodedToken) {
    const error = new Error('Token is invalid or has expired.');
    error.statusCode = 401;
    next(error);
    return;
  }
  req.userId = decodedToken.userId;
  next();
};



// require('dotenv').config();
// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const authHeader = req.get('Authorization');
//   if (!authHeader) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     next(error);
//     return;
//   }
//   const token = authHeader.split(' ')[1];
//   try {
//     decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     err.statusCode = 500;
//     next(err);
//     return;
//   }
//   if (!decodedToken) {
//     const error = new Error('Not authenticated.');
//     error.statusCode = 401;
//     next(error);
//     return;
//   }
//   req.userId = decodedToken.userId;
//   next();
// };
