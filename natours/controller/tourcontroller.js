const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

// Calling it out
exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5'; 
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// Creating a constructor function


exports.getAllTours = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
      message : 'Requested information is removed successfully'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getTourStats = async (req,res) => {
  try {
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
  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}
