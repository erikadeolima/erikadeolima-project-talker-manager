// https://stackoverflow.com/questions/8855687/secure-random-token-in-node-js
const crypto = require('crypto');

function cryptoRandomString() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = cryptoRandomString;