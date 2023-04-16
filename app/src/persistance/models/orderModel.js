const mongoose = require('mongoose');
const { Schema } = require('mongoose');

export const order = mongoose.model('Order', new mongoose.Schema({
    numberOrder: {
        type: String,
        required: true
    },
    orderState: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    user:{
        type: String,
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    products:{
        type: Array,
        required: true
    }
}));