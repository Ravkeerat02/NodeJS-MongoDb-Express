const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });
// SETTING UP DATABASE
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB connection successful!'));

// read json file 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8')); 

// importing data in db 
const importData = async () =>{
  try{
    await Tour.create(tours);
    console.log('Data loaded properly');
  }catch(err){
    console.log(err);
  }
}
// deleting all data from db
const deleteData = async() =>{
  try{
    await Tour.deleteMany();
    console.log('Data deleted properly');
  }catch(err){
    console.log(err);
  }
} 

if(process.argv[2] === '--import'){
  importData()
}else if(process.argv[2] === '--delete'){
  deleteData()
}

console.log(process.argv)

