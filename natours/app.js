const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitze = require('express-mongo-sanitize');
const xss = require('xss-clean')
// hyper parameter protection
const hpp = require('hpp') 

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');

const app = express();


// Middleware

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// creating a reate limit - limits the number of requests from a single IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, //  100 request in 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
})

app.use('/api', limiter)


// body parser, reading data from body into req.body
app.use(express.json({
    limit: '10kb'
}));

// data sanitization against NOSQL query - filtrs special characters - query example attack
app.use(mongoSanitze())

// app -  cross site scripting attacks - removes malicious HTML code
app.use(xss())

// prevents paramter pollution 
app.use(hpp({
    // array of properties that are allowed to be duplicated
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}));


// setting up static
app.use(express.static(`${__dirname}/public`))

// API routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/reviews', reviewRouter);

// error handling - for everything - not related to the above routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
