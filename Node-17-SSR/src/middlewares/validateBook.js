/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

async function validateBook(req, res, next) {
  const userSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    year: Joi.number().integer().min(1900).max(2030).required(),
    category: Joi.number().integer().min(1).max(5).required(),
  });
  try {
    await userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    console.log('err in validateBook middleware:', err);
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

module.exports = validateBook;
