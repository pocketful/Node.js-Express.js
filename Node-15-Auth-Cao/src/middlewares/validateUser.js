const Joi = require('joi');

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
    console.log('err in validateUser middleware:', err);
    console.log('errDetails ===', err.details);
    const message = err.details.map((errObj) => ({
      message: errObj.message,
      field: errObj.path[0],
    }));
    console.log('details message ===', message);
    res.status(400).json({ success: false, message }); // no need for return with next
    // res.status(400).json({ success: false, message: err.details }); // no need for return with next
  }
}

module.exports = validateUser;
