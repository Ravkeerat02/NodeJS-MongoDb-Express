const Tour = require('./../models/tourModel');

// Calling it out
exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5'; 
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

// Creating a constructor function
class APIFeatures {
  constructor(query, queryString) {
    Object.assign(this, { query, queryString });
  }

  filter(){
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // Converting obj to string
    let queryStr = JSON.stringify(queryObj);
    // Filters on the basis of the specified text 
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // Stores the query obj - which is being used for different operations
    this.query = this.query.find(JSON.parse(queryStr));
    // Returns the entire obj
    return this;
  }

  sort(){
    if(this.queryString.sort){
      // Returns array of all the name
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this; 
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Everything except this field
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate(){
    const page = this.queryString.page * 1 || 1; 
    const limit = this.queryString.limit * 1 || 100; 
    // Skips the page based on the page and limit
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit); 
    return this ; 
  }
}

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