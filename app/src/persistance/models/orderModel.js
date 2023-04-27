import mongoose from 'mongoose';
const { Schema } = mongoose;

const order = mongoose.model('Order', new mongoose.Schema({
    orderState: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
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

export default order