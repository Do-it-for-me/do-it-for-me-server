const mongoose = require("mongoose");
const createError = require("http-errors");

const Service = require("../models/Service");

const getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).send(services);
  } catch (err) {
    next(err);
  }
};

const addService = async (req, res, next) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).send(newService);
  } catch (err) {
    next(err);
  }
};

const getService = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw new createError.NotFound();
    const service = await Service.findById(id);
    if (!service) throw new createError.NotFound();
    res.status(200).send(service);
  } catch (err) {
    next(err);
  }
};

exports.getServices = getServices;
exports.addService = addService;
exports.getService = getService;
