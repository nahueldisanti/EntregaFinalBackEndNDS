import mongoose from 'mongoose';
const { Schema } = mongoose;

const messages = mongoose.model('Messages', new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: false,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    }
}));

export default messages