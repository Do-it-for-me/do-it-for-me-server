const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = model("Service", ServiceSchema);
