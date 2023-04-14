const mongoose = require('mongoose');
const { Schema } = require('mongoose');

export const Cart = mongoose.model('Cart', new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    productos:{
        type: Array,
        required: true
    }
}));