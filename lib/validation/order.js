const { body } = require('express-validator');

module.exports = [
    body('record')
        .optional()
        .trim()
        .escape()
];