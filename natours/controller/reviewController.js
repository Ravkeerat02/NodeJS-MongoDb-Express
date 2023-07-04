const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');

// displays all the view
exports.getAllReviews = catchAsync(async ( req , res , next) =>{
    const reviews = await Review.find()

    res.status(200).json({
        status : 'success',
        results : reviews.length,
        data : {
            reviews
        }
    });
});
// used to create Review
exports.createReview = catchAsync(async ( req , res , next) =>{
    const newReview = await Review.create(req.body)

    res.status(201).json({
        status : 'success',
        data : {
            review : newReview
        }
    });
});