const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // basic filter
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // advanced filter
    // converting obj to string
    let queryStr = JSON.stringify(queryObj);
    // filters on the basis of the specified text 
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // stores the query obj - which is being used for different operations
    let query = Tour.find(JSON.parse(queryStr));

    // Sorting 
    if(req.query.sort){
      // returns array of all the name
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
    }else{
      query = query.sort('-createdAt')
    }

    // filed limiting - limiting the amount of data returned
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }else{
      // everything except this filed
      query = query.select('-__v')
    }

    // pagination - just selecting(viewing) specifc page at time
    // converts string to a number
    const page = req.query.page * 1 || 1; 
    const limit = req.query.limit * 1 || 100; 
    // skips the page based on the page and limit
    const skip = (page - 1 ) * limit

    query = query.skip(skip).limit(limit); 
    if(req.query.page){
      const numTours = await Tour.countDocumnets();
      if(skip >= numTours) throw new Error("Page doesnt exist")
    }
    // calling it out
    // query = query.skip(skip).limit(limit)
    const tours = await query; 

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
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
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
