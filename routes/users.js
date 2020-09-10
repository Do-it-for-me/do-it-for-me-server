const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/usersController");
const validator = require("../middleware/validator");
const authorizeToken = require("../middleware/tokenAuth");
const authorizeUser = require("../middleware/userAuth");
//const authorizeAdmin = require("../middleware/adminAuth");
const userRules = require("../lib/validation/user");

// Protect routes by running authToken middleware before the controllers
// Make sure only admins have permission by plugging in another middleware which checks for proper role
router.route("/").get(/* authorizeToken, authorizeAdmin, */ getUsers);

router.route("/signup").post(validator(userRules), addUser);

router.post("/login", loginUser);

router
  .route("/:id")
  .get(authorizeToken, getUser)
  .put(authorizeToken, authorizeUser, validator(userRules), updateUser)
  .delete(authorizeToken, authorizeUser, deleteUser);

module.exports = router;
