const express = require('express');
const tourController = require('./../controller/tourcontroller');

const router = express.Router();

// router.param('id', tourController.checkID);
// this is used to call the specific routes
router.route('/top-5-cheap').get(tourController.aliasTopTour,tourController.getAllTours)
router.route('/tour-stats').get(tourController.getTourStats);


router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;