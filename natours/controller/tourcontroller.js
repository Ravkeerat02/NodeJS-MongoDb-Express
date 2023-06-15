const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

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
    // Generate new ID for the tour
    const newId = tours[tours.length - 1].id + 1;
    
    // Create a new tour with the generated ID and request body
    const newTour = Object.assign({ id: newId }, req.body);
    
    // Add the new tour to the tours array
    tours.push(newTour);
    
    // Write the updated tours array to the file
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
      // Respond with the new tour
      res.status(201).json({
        status: 'New tour created',
        data: {
          tour: newTour,
        },
      });
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
    // Convert the ID parameter to a number
    const id = req.params.id * 1;
  
    // If ID is greater than the number of tours, return error
    if (id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
  
    // Respond with success and updated tour
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here>',
      },
    });
  };
  
  exports.deleteTour = (req, res) => {
    // Convert the ID parameter to a number
    const id = req.params.id * 1;
  
    // If ID is greater than the number of tours, return error
    if (id > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
  
    // Respond with success and no data
    res.status(204).json({
      status: 'success',
      data: null,
    });
  };