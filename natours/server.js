const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');



// SETTING UP DATABASE
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('DB connection successful!'));

process.on('uncaughtException', err => {
  // shut down applciation  - 0(success) 1(fail)
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name )
  server.close(() => {
    process.exit(1);
  })
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// UNHANDLED REJECTION
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  // shut down applciation  - 0(success) 1(fail)
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  })
});

