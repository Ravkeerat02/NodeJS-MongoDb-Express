const mongoose = require('mongoose');
const validator = require('validator');

// settimng up the schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
        },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique : true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
        type: String,

    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        maxlength: 24
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
    }
    })_

const User = mongoose.model('User', userSchema);
module.exports = User;

