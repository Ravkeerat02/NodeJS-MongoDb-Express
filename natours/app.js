const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
const port = 3000;

// will return a function to similar to the one we created(middlwware) 
// in simple words - returns detailed information about the package(requested) 
app.use(morgan('dev'));


app.use(express.json());
// creating middleware
app.use((req , res , next ) =>{
    console.log('hello from the middleware');
    // important to use when creating middleware
    next();
}); 
app.use((req , res , next ) =>{
    // converts into readable string
    req.requestTime = new Date().toISOString();
    next();
})


// Helper functions
const getAllTours = (req, res) => {
  // Return all tours
//   console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt : req.requestTime,
    data: {
      tours: tours,
    },
  });
};

const updateTour = (req, res) => {
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

const getById = (req, res) => {
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

const updateTourID = (req, res) => {
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

const deleteTour = (req, res) => {
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

// Read tours data from file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// API Routes
app.route('/api/v1/tours')
  .get(getAllTours)   // Get all tours
  .post(updateTour);  // Create a new tour

app.route('/api/v1/tours/:id')
  .get(getById)       // Get a tour by ID
  .patch(updateTourID) // Update a tour by ID
  .delete(deleteTour); // Delete a tour by ID

  // ROUTES



// starts the server
app.listen(port , () =>{
    console.log(`listening on port ${port}`)
})

