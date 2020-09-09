const mongoose = require('mongoose');
const createError = require('http-errors');

const Order = require('../models/Order');
const Record = require('../models/Record');

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order
            .find()
            .populate('record', '-__v -year');
        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
}

exports.addOrder = async (req, res, next) => {
    try {
        const newOrder = new Order(req.body);
        // Check for whether ordered record exists
        const recordExists = await Record.findById(newOrder.record);
        if (!recordExists) throw new createError.NotFound('Record does not exist');
        await newOrder.save();
        res.status(201).send(newOrder);
    } catch (err) {
        next(err);
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        const order = await Order
            .findById(id)
            .populate('record', '-__v -year');
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);
    } catch (err) {
        next(err);
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        // Check for whether changed record exists
        if (req.body.record) {
            const recordExists = await Record.findById(req.body.record);
            if (!recordExists) throw new createError.NotFound('Record does not exist');
        }
        const updated = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updated) throw new createError.NotFound();
        res.status(200).send(updated);
    } catch (err) {
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
        const deleted = await Order.findByIdAndRemove(id);
        if (!deleted) throw new createError.NotFound();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};