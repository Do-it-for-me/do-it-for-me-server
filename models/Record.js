const { Schema, model } = require('mongoose');

const RecordSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    }
    
});

module.exports = model('Record', RecordSchema);