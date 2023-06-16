const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
// SETTING UP DATABASE
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB connection successful!'));

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

  const testTour = new Tour({
    name : 'TTester',
    price : 12500, 
    rating : 1.5
  }) ;

  testTour.save().then(doc => {
    console.log(doc) ;
  }).catch(err => {
    console.log('ERROR : ' , err) ;
  })

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});