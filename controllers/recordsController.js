const mongoose = require('mongoose');
const createError = require('http-errors');

const Record = require('../models/Record');

const getRecords = async (req, res, next) => {
    try {
        const records = await Record.find();
        res.status(200).send(records);
    } catch (err) {
        next(err);
    }
};

const addRecord = async (req, res, next) => {
    try {
        const newRecord = new Record(req.body);
        await newRecord.save();
        res.status(201).send(newRecord);
    } catch (err) {
        next(err);
    }    
}

const getRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        const record = await Record.findById(id);
        if (!record) throw new createError.NotFound();
        res.status(200).send(record);
    } catch (err) {
        next(err);
    }
}

const updateRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        const updated = await Record.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

const deleteRecord = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        const deleted = await Record.findByIdAndRemove(id);
        if (!deleted) throw new createError.NotFound();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

exports.getRecords = getRecords;
exports.addRecord = addRecord;
exports.getRecord = getRecord;
exports.updateRecord = updateRecord;
exports.deleteRecord = deleteRecord;