const jwt  = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

// regsiter(signup) a new user
// only allows the specific data to be passed to the db 
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name : req.body.name, 
        email : req.body.email,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword
    });

    const expiresInDays = 30;
    const expiresInSeconds = expiresInDays * 24 * 60 * 60;
    // creates  a new token - payload followed by secret
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        // setting expiry of the token 
        expiresIn : expiresInSeconds
    })
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});

