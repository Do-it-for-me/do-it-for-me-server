const { body } = require('express-validator');

module.exports = [
    body('title')
        .optional()
        .trim()
        .escape()
        .isLength({ max: 256 })
        .withMessage('Title must be no more than 256 characters'),
    body('artist')
        .optional()
        .trim()
        .escape()
        .isLength({ max: 256 })
        .withMessage('Artist address must be no more than 256 characters'),
    body('coverImage')
        .optional()
        .trim()
        .isURL()
        .withMessage('Not a valid URL')
];