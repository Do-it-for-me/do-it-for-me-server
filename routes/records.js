const express = require('express');
// We need to instantiate an express Router
const router = express.Router();

const { getRecords, addRecord, getRecord, updateRecord, deleteRecord } = require('../controllers/recordsController');
const validator = require('../middleware/validator');
const authorizeToken = require('../middleware/tokenAuth');
const authorizeAdmin = require('../middleware/adminAuth');
const recordRules = require('../lib/validation/record');

router
    .route('/')
    .get(getRecords)
    .post(authorizeToken, authorizeAdmin, validator(recordRules), addRecord);

router
    .route('/:id')
    .get(getRecord)
    .put(authorizeToken, authorizeAdmin, validator(recordRules), updateRecord)
    .delete(authorizeToken, authorizeAdmin, deleteRecord)

module.exports = router;