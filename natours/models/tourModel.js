const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
    unique: true
  },
  slug:{
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
  startDates: [Date],
  secretTour :{
    type : Boolean , 
    default : false 
  }
},{
  // for the options
  toJSON :  {virtuals: true},
  toObject : {virtuals: true}

});

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

module.exports = Tour;


