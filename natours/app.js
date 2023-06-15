const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();


// Middleware
app.use(express.json());
app.use(morgan('dev'));

// setting up static
app.use(express.static(`${__dirname}/public`))

// API routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;