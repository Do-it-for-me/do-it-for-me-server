const { body } = require("express-validator");

module.exports = [
  body("firstName")
    .trim()
    .escape()
    .isLength({ min: 2, max: 256 })
    .withMessage("First name must be between 2 and 256 characters"),
  body("lastName")
    .trim()
    .escape()
    .isLength({ min: 2, max: 256 })
    .withMessage("Last name must be between 2 and 256 characters"),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid e-mail format")
    .isLength({ max: 256 })
    .withMessage("E-mail address must be no more than 256 characters"),
  body("password")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .withMessage(
      "Minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character"
    ),
  body("address.street").trim().escape(),
  body("address.zip").trim().escape(),
  body("address.city").trim().escape(),
];