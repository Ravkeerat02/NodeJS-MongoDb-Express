const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

// Calling it out
exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5'; 
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// Creating a constructor function


exports.getAllTours = catchAsync(async (req, res, next) => {
  
    // Executes query 
    // Runs code for API functionality
    // It gets returned because of using `this` keyword
    const features = new APIFeatures(Tour.find(), req.query).
    filter()
    .sort()
    .limitFields()
    .paginate();
    const tours = await features.query; 

    // Sends response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
  
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  });

// will return promise , will result in catch if its rejected(not approved)
exports.createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });  
});

exports.updateTour = catchAsync(async (req, res, next) => {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  });

exports.deleteTour = catchAsync(async (req, res, next) => {
  
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
      message : 'Requested information is removed successfully'
    }); 
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  
    // aggregate - similar to playing with query - can manipulate (play around) data
    const stats = await Tour.aggregate([
      // will refer to different stages 
      // match - to select or filter certain docs
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: '$difficulty', // refers to the field,
          numTours: {$sum: 1 },
          numRatings :{$sum : '$ratingsQuantity'},
          averageRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort :{
          avgPrice : 1
        }
      }

    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  });

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {

    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        // breaks the array into singular pieces
        $unwind: '$startDates'
      },
      {
        // match dates within the specified year
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        // group tours by month and count the number of tours in each month
        $group: {
          _id: { $month: '$startDates' },
          numTours: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        // add a new field to specify the month as a string
        $addFields: {
          month: '$_id'
        }
      },
      {
        // project only the necessary fields
        $project: {
          _id: 0
        }
      },
      {
        // sort the results by month
        $sort: {
          month: 1
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  });

