const express = require('express');
const router = express.Router();

const { getOrders, addOrder, getOrder, updateOrder, deleteOrder } = require('../controllers/ordersController');
const validator = require('../middleware/validator');
const authorizeToken = require('../middleware/tokenAuth');
const orderRules = require('../lib/validation/order');

// Protect routes by running authorizeToken middleware before the controllers

router
  .route('/')
  .get(authorizeToken, getOrders)
  .post(authorizeToken, validator(orderRules), addOrder)

router
  .route('/:id')
  .get(authorizeToken, getOrder)
  .put(authorizeToken, validator(orderRules), updateOrder)
  .delete(authorizeToken, deleteOrder)

module.exports = router;