const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

const app = express();


// Middleware

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use(express.json());
  
// setting up static
app.use(express.static(`${__dirname}/public`))

// API routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// error handling - for everything - not relatedd to the above routes
app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`
    });
  });


module.exports = app;