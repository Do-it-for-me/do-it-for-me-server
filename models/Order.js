const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    record: {
        type: Schema.Types.ObjectId,
        ref: 'Record',
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = model('Order', OrderSchema);