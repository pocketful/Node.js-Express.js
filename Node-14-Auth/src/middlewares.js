const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { privateKey } = require('./config');

// Middleware helper showBody
function showBody(req, res, next) {
  if (req.method === 'POST') {
    console.log('req.body:', req.body);
  }
  next();
}

// Middleware validation
async function validateUser(req, res, next) {
  const userSchema = Joi.object({
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().min(3).max(255).required(),
    password2: Joi.any().valid(Joi.ref('password')),
  });
  try {
    await userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    console.log('validate err:', err);
    res.status(400).json({ success: false, message: err.details }); // no need for return with next
  }
}

// Token validation
async function validateToken(req, res, next) {
  console.log('req.headers.authorization ===', req.headers.authorization);
  const tokenFromHeader = req.headers.authorization?.split(' ')[1];
  console.log('tokenFromHeader ===', tokenFromHeader);
  // token doesn't exist
  if (!tokenFromHeader) {
    console.log('No token');
    return res.status(401).json({ success: false, message: 'No token' }); // 401 Unauthorized
  }
  // token exist
  try {
    const tokenPayload = await jwt.verify(tokenFromHeader, privateKey);
    console.log('tokenPayload ===', tokenPayload); // { userId: 3, iat: 1652724058, exp: 1652727658 }
    // pass userId as req to the next function
    const { userId } = tokenPayload;
    req.userId = userId;
    // if we try to pass something in next() as argument it will go to errors handling. if there's no error fn then it will just go to default fn
    next();
  } catch (err) {
    console.log('validateToken err:', err);
    res.status(403).json({ success: false, message: 'No token' }); // 403 Forbidden
  }
}

module.exports = {
  showBody,
  validateUser,
  validateToken,
};
