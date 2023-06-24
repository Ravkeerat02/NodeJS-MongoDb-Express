const jwt  = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

// used for expiration generation
const expiresInDays = 90;
const secondsInADay = 24 * 60 * 60;
const expiresInSeconds = expiresInDays * secondsInADay;



const signToken = id =>{
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        // setting expiry of the token 
        expiresIn : expiresInSeconds
    })
}

// regsiter(signup) a new user
// only allows the specific data to be passed to the db 
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name : req.body.name, 
        email : req.body.email,
        password : req.body.password,
        confirmPassword : req.body.confirmPassword
    });

   
    // creates  a new token - payload followed by secret
    const token = signToken(newUser._id)
    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});

// loggin in the user
exports.login = catchAsync(async (req, res, next) => {
    const {email , password } = req.body;

    // 1) check if email and password exist
    if(!email || !password){
        return next(new AppError('Please provide email and password', 400));
    }
    // check if user exist and password is correct - +(not select filed(to display()))
    const user = await User.findOne({email}).select('+password');
    // instance method - so available all over
    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }

    // send token when all good
    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    })
})


exports.protect = catchAsync(async (req, res, next) => {
    // checking for token 
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // want the 2nd element(1)
        token = req.headers.authorization.split(' ')[1];
    }
   
    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access', 401));
    }
    // validate token 
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET) ;
    
    // check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        return next(new AppError('The user belonging to this token does no longer exist', 401));
    }
    // check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password! Please log in again', 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();

})

// authorization - verifying the right of user v 
// will return middleware function which we are gonna create
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide']
      if (!roles.includes(req.user.role)) {
        return next(
            // prints out the error if needed -403(forbidden)
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };

//   forgot passowrd
// // forgot password
// exports.forgotPassword = catchAsync(async (req, res, next) => {
//     // getting user detail
//     const user = await User.findOne({
//       email: req.body.email
//     });
//     if (!user) {
//       return next(new AppError('There is no user with that email address', 404));
//     }
    
//     // generating token - instant method to create the token
//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });
  
//     // send it via email - simple token to be shared
//     const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
//     const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
//     try {
//       await sendEmail({
//         email: user.email,
//         subject: 'Your password reset token (valid for 10 min)',
//         message: message
//       });
  
//       res.status(200).json({
//         status: 'success',
//         message: 'Token sent to email'
//       });
//     } catch (err) {
//       user.passwordResetToken = undefined;
//       user.passwordResetExpires = undefined;
//       await user.save({ validateBeforeSave: false });
  
//       return next(new AppError('There was an error sending the email. Try again later!', 500));
//     }
//   });

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
  
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
  });
  

// reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
    
})


