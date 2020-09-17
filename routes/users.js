const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/uploads/",
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  userImage,
} = require("../controllers/usersController");
const validator = require("../middleware/validator");
const authorizeToken = require("../middleware/tokenAuth");
const authorizeUser = require("../middleware/userAuth");
//const authorizeAdmin = require("../middleware/adminAuth");
const addUserRules = require("../lib/validation/addUser");
const putUserRules = require("../lib/validation/putUser");
const notUserAuth = require("../middleware/notUserAuth");

// Protect routes by running authToken middleware before the controllers
// Make sure only admins have permission by plugging in another middleware which checks for proper role
router.route("/").get(/* authorizeToken, authorizeAdmin, */ getUsers);

router.route("/signup").post(validator(addUserRules), addUser);

router.post("/login", loginUser);
router.post("/:id/userImage", upload.single("userImage"), userImage);

router
  .route("/:id")
  .get(authorizeToken, notUserAuth, getUser)
  .put(authorizeToken, authorizeUser, validator(putUserRules), updateUser)
  .delete(authorizeToken, authorizeUser, deleteUser);

module.exports = router;
