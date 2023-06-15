const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkID = (req, res, next) => {
  // Check if the ID is valid
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// Helper functions
exports.getAllTours = (req, res) => {
  // Return all tours
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.updateTour = (req, res) => {
    // Respond with the new tour
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  };


exports.getById = (req, res) => {
  // Convert the ID parameter to a number
  const id = req.params.id * 1;

  // Find the tour with the matching ID
  const tour = tours.find((el) => el.id === id);

  // If tour is not found, return error
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // Return the found tour
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updateTourID = (req, res) => {
  // If ID is greater than the number of tours, return error

  // Respond with success and updated tour
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // If ID is greater than the number of tours, return error

  // Respond with success and no data
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
