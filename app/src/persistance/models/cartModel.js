const mongoose = require('mongoose');
const { Schema } = require('mongoose');

export const cart = mongoose.model('Cart', new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    products:{
        type: Array,
        required: true
    }
}));