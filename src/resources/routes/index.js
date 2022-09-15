const pagesRouter = require('./Pages');
const adminRouter = require('./Admin');

function router(app) {
    app.use('/', pagesRouter);
    app.use('/admin', adminRouter);
}

module.exports = router;
