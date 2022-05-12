const Joi = require('joi');

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

module.exports = {
  showBody,
  validateUser,
};
