const mongoose = require('mongoose');
const { Schema } = require('mongoose');

export const Messages = mongoose.model('Messages', new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    }
}));