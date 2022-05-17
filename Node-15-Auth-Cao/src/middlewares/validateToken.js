const jwt = require('jsonwebtoken');
const { privateKey } = require('../config');

// eslint-disable-next-line consistent-return
async function validateToken(req, res, next) {
  // console.log('req.headers.authorization ===', req.headers.authorization);
  const tokenFromHeader = req.headers.authorization?.split(' ')[1];
  console.log('tokenFromHeader ===', tokenFromHeader);

  // if token doesn't exist
  if (!tokenFromHeader) {
    console.log('No token');
    return res.status(401).json({ success: false, message: 'No token' }); // 401 Unauthorized
  }

  // token exist
  try {
    const tokenPayload = await jwt.verify(tokenFromHeader, privateKey);
    console.log('tokenPayload ===', tokenPayload); // { userId: 3, iat: 1652724058, exp: 1652727658 }

    // // pass userId as req to the next function
    // const { userId } = tokenPayload;
    // req.userId = userId;
    // // if we try to pass something in next() as argument it will go to errors handling. if there's no error fn then it will just go to default fn

    next();
  } catch (err) {
    console.log('err in validateToken middleware:', err);
    res.status(403).json({ success: false, message: 'No token' }); // 403 Forbidden
  }
}

module.exports = validateToken;
