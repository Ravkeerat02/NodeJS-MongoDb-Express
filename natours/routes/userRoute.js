const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

// Signup - sends the data -similar to creating user
router.post('/signup', authController.signup);
// login route for the user
router.post('/login', authController.login);
// view all user
router.route('/').get(userController.getAllUsers).post(userController.createUser);
// forgot password
router.post('/forgotPassword', authController.forgotPassword);
// reset password
router.patch('/resetPassword:token', authController.resetPassword);
// update me 
router.patch('/updateMe',authController.protect , userController.updateMe);
// delete me 
router.delete('/deleteMe',authController.protect , userController.deleteMe);


router.route('/').get(userController.getAllUsers)
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
