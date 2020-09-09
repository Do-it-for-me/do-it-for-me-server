const express = require("express");
// We need to instantiate an express Router
const router = express.Router();

const {
  getServices,
  addService,
  getService,
} = require("../controllers/ServicesController");
/* const validator = require("../middleware/validator");
const authorizeToken = require("../middleware/tokenAuth");
const authorizeAdmin = require("../middleware/adminAuth");
const recordRules = require("../lib/validation/record"); */

router.route("/").get(getServices).post(addService);
/* .post(authorizeToken, authorizeAdmin, validator(recordRules), addService); */

router.route("/:id").get(getService);
/* .put(authorizeToken, authorizeAdmin, validator(recordRules), updateRecord)
  .delete(authorizeToken, authorizeAdmin, deleteRecord); */

module.exports = router;
