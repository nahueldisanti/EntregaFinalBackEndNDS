import mongoose from 'mongoose';
const { Schema } = mongoose;

const cart = mongoose.model('Cart', new mongoose.Schema({
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

export default cart