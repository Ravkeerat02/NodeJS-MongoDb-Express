const express = require('express');
const tourController = require('../controller/tourController');
const authController = require('./../controller/authController');
// const reviewRouter = require('./../routes/reviewRoute');

const router = express.Router();

// router.param('id', tourController.checkID);
// this is used to call the specific routes
router.route('/top-5-cheap').get(tourController.aliasTopTour, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// router.use('/:tourId/reviews', reviewRouter);
// router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
