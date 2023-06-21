class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        // converts into string and checks if it starts with 4
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; 
        // can be used to check if the error is operational or not
        this.isOperational = true;
        // removes the constructor from the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError ; 
// creating an extra class to create a niche error handler