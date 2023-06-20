const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      maxLength: [40, 'A tour name must have less or equal than 40 characters'],
      minLength: [10, 'A tour name must have more or equal than 10 characters'],
      trim: true,
      unique: true,
      validate: [
        {
          validator: function(value) {
            // Custom validation to check the actual length
            return value.length >= 10 && value.length <= 40;
          },
          message: 'Tour name must be 10-40 characters long'
        },
        {
          validator: function(value) {
            // Additional validation to check if name has only letters
            return validator.isAlpha(value);
          },
          message: 'Tour name must only contain letters'
        }
      ]
    },
    slug: {
      type: String
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
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a rating']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
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
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    // for the options
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// DOCUMENT MIDLWARE
// setting up virtual properties - CANT BE YSED IN QUERY - belongs to the console not the controller
// arrow functin cant use this directly but a regular dunction can 
// middleware - can either be before or after a fucntion is being called and processed
tourSchema.virtual('durationWeek').get(function(){
  return this.duration / 7 ; 
})

// // PRE/POST HOOKS - mongoose middleware - runs before save and create 
// tourSchema.pre('save',function(next){
//   this.slug = slugify(this.name , {lower: true})
//   // will refer to next middleware
//   next()
// });

// tourSchema.post('save',function(doc , next){
//   console.log(doc);
//   next()
// })

// QUERY MIDDLEWARE - CAN RUN BEFORE/AFTER ANY QUERY
tourSchema.pre('find',function(next){
  this.find({
    secreTOUR : {$ne : 'true'}
  })
  next();
}) 
const Tour = mongoose.model('Tour', tourSchema);

// Aggregation Middlware - happends before or after an aggreagte function
tourSchema.pre('aggregate',function(next){
  
  // adds in stat of an array
  this.piepleine().unshift({
    $match : {secretTour : {$ne : true}}
  })
  console.log(this.pipeline());
  next()
})

module.exports = Tour;


