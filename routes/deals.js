const express = require("express");
const router = express.Router();
const {
  getDeals,
  addDeal,
  confirmDeal,
  cancelDeal,
  getDealChat,
  postDealChat,
} = require("../controllers/DealsController");

//ready
const authorizeToken = require("../middleware/tokenAuth");

//to be edited
const validator = require("../middleware/validator");

router.route("/").get(authorizeToken, getDeals);
router.route("/").post(authorizeToken, addDeal);

router.route("/:id/confirm").put(authorizeToken, confirmDeal);

router.route("/:id/cancel").put(authorizeToken, cancelDeal);
router.route("/:id/chat").get(authorizeToken, getDealChat);
router.route("/:id/chat").put(authorizeToken, postDealChat);


module.exports = router;
