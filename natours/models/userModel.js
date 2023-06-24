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
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        // default: 'user'
      },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 5,
        maxlength: 24,
        // will not show the password in the output
        select:false
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
    },
    // will only occcur when password is changed
    passwordChangedAt : Date
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

// insatnce method - available on all documents of a certain collection
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    // compares the password
    return await bcrypt.compare(candidatePassword, userPassword);
}

// will refer to when the password was chnaged
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const chnagedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        console.log(this.passwordChangedAt, JWTTimestamp)
    }
    return false
}




const User = mongoose.model('User', userSchema);
module.exports = User;

