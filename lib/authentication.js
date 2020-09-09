const { promisify } = require('util');
const { sign, verify } = require('jsonwebtoken');

exports.sign = promisify(sign); // When called, needs payload, secret(, optional config)
exports.verify = promisify(verify); // When called, needs token, secret