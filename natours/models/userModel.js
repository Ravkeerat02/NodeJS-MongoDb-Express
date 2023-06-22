const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        minlength: 5,
        maxlength: 24
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // this only works on CREATE and SAVE - custom validator - check if the password and confirmPassword are same
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    }
});

// saves the password to db
userSchema.pre('save', async function(next) {
    // if the password is not modified then return next
    if(!this.isModified('password')) return next();
    // converts the password using the hashing tech
    this.password = await bcrypt.hashSync(this.password, 12);
    this.confirmPassword = undefined;
    next()


})




const User = mongoose.model('User', userSchema);
module.exports = User;

