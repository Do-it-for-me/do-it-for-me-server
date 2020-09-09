const { Schema } = require('mongoose');

const AddressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
}, { '_id': false });

module.exports = AddressSchema;
