const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();


// Middleware

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use('/api', limiter')

// creating a reate limit - limits the number of requests from a single IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, //  100 request in 1 hour
    message : 'Too many requests from this IP, please try again in an hour!'
}) 

app.use(express.json());
  
// setting up static
app.use(express.static(`${__dirname}/public`))

// API routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// error handling - for everything - not relatedd to the above routes
app.all('*', (req, res, next) => {
    
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

// global error handling middleware
app.use(globalErrorHandler)

module.exports = app;