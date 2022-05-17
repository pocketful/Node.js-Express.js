const { loginUserDb } = require('../models/loginModel');

async function loginUser(req, res) {
  const emailInput = req.body.email;
  console.log('emailInput ===', emailInput);
  // const passwordInput = req.body.password;
  try {
    // check if user with this email exists
    const foundUser = await loginUserDb(emailInput);
    console.log('foundUser ===', foundUser);

    if (!foundUser) throw new Error(400);
    // if (!foundUser) {
    //   console.log("email wasn't found");
    //   // return res.status(400).json({ success: false, message: 'Wrong email or password. });
    // }

    return res.json({ success: true, message: 'Login success.' });
    // return res.sendStatus(303); // server is redirecting the user agent to a different resource
  } catch (err) {
    console.log('error in login controller:', err); // err.name, err.message
    if (err.message === '400') {
      return res.status(400).json({ success: false, message: 'Wrong email or password.' });
    }
    if (err.errno === 1054) {
      return res.status(400).json({ success: false, message: 'Bad request.' });
    }
    return res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
}

module.exports = loginUser;
