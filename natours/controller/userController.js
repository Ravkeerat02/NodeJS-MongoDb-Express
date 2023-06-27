const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj , ...allowedFields) =>{
  // loop through object and check if its a regular or modified obj 
  const newObj = {};
  Object.keys(obj).forEach(el =>{
    if(allowedFields.includes(el)) return newObj[el] = obj[el];
  })
  return newObj
}

// just setting up routes
exports.getAllUsers = catchAsync(async(req, res,next) => {
  const users = await User.find();

    res.status(500).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      }
    });
  });

  // updating current user(name and email)
  exports.updateMe = catchAsync(async(req , res ,next) =>{
    // creating error if trying to updae psswd
    if(req.body.password || req.body.passwordConfirm){
      return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
    }

    // update user doc
    // filtered extra data followed by udapting data
    const filteredBody = filterObj(req.body , 'name' , 'email');
    const udpatedUser = await User.findByIdAndUpdate(req.user.id , filteredBody , {
      new: true, runValidators: true
    });
    
    res.status(200).json({
      status: 'success',
      data:{
        user : udpatedUser
      }
    })
  })
  
exports.createUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
    });
  };
  
exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
    });
  };
  
exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
    });
  };
  
exports.deleteUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
    });
  };