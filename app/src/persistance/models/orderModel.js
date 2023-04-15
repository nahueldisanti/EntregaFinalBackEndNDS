const mongoose = require('mongoose');
const { Schema } = require('mongoose');

export const order = mongoose.model('Order', new mongoose.Schema({
    numeroDeOrden: {
        type: String,
        required: true
    },
    estadoDeOrden: {
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
    direccion: {
        type: String, 
        required: true
    },
    productos:{
        type: Array,
        required: true
    }
}));