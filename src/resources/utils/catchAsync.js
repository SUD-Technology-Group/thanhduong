const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => res.status(400).render('error', { layout: false, error }));
};

module.exports = catchAsync;
