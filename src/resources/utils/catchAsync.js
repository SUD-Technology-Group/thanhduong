const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => res.status(400).send({ msg: err.message }));
};

module.exports = catchAsync;
