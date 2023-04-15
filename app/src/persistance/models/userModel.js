const mongoose = require('mongoose');
const { Schema } = require('mongoose');

export const user = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    domicilio:{
        type: String,
        required: true
    },
    tel:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    }
}));