const mongoose = require('mongoose') ;
// creating model - describing(validator)
const tourSchema = new mongoose.Schema({
    name : {
      type : String,
      required : [true , 'A tour must have a name'],
    }, 
    price :{
      type : Number,
      required : [true , 'A tour must have a rating']
    }, 
    rating : {
      type: Number , 
      default : 4.5 
    }

  }) ; 

  const Tour = mongoose.model('Tour' , tourSchema) ;
  module.exports = Tour ;