const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
    unique: true
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a rating']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    required: [true, 'A tour must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
},{
  // for the options
  toJSON :  {virtuals: true},
  toObject : {virtuals: true}

});

// setting up virtual properties - CANT BE YSED IN QUERY - belongs to the console not the controller
// arrow functin cant use this directly but a regular dunction can 
tourSchema.virtual('durationWeek').get(function(){
  return this.duration / 7 ; 
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
