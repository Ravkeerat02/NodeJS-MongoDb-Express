module.exports = // using this for simplying the error handling
catchAsync = fn => {
  return (req , res , next) => {
    fn(req,res,next).catch(next);
    };
  }