const express = require('express')
const tourController = require('../controller/tourController')
const router = express.Router()

// creating parameter
router.param('id', tourController.checkID)

// API tour routes
router.route('/')
  .get(tourController.getAllTours)   // Get all tours
  .post(tourController.updateTour);  // Create a new tour

router.route('/:id')
  .get(tourController.getById)       // Get a tour by ID
  .patch(tourController.updateTourID) // Update a tour by ID
  .delete(tourController.deleteTour); // Delete a tour by ID


module.exports = router