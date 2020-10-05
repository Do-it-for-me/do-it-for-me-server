const express = require("express");
const router = express.Router();
const {
  getDeals,
  addDeal,
  confirmDeal,
  cancelDeal,
} = require("../controllers/DealsController");

//ready
const authorizeToken = require("../middleware/tokenAuth");

//to be edited
const validator = require("../middleware/validator");

router.route("/").get(authorizeToken, getDeals);
router.route("/").post(authorizeToken, addDeal);

router.route("/:id").put(authorizeToken, confirmDeal); //to be created for confirming the deal
/* .delete(authorizeToken, deleteDeal); */

router.route("/:id/cancel").put(authorizeToken, cancelDeal);

module.exports = router;
