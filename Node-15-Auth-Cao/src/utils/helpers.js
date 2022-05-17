// https: //jsdoc.app/about-getting-started.html
const bcrypt = require('bcryptjs');

/**
 * Takes plain text and returns hashed password
 * @param {string} plainTextString
 * @returns {string} hashed password
 */
function hashPassword(plainTextString) {
  return bcrypt.hashSync(plainTextString, 10);
}

module.exports = {
  hashPassword,
};
