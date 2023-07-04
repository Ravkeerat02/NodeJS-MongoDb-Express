// will return controllerexpr
// helper file which works as the main file and can be used to perform any fucntion with just the name of it
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");


exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc){
        return next(new AppError('No document  found with that ID',404));
    }
    res.status(204).json({
        statu : 'success',
        data : null
    })
})
