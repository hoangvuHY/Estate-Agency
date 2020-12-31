var jwt = require('jsonwebtoken');
function Sign(infoSecure, secureKey, expires, algorithm) {
  return jwt.sign(infoSecure, secureKey, expires, algorithm);
}
function Verify(token, secureKey, expires, algorithm) {
  return jwt.verify(token, secureKey, expires, algorithm);
}

module.exports = {
  Sign, Verify
}