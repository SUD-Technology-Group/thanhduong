const homeRouter = require('./Home');
const adminRouter = require('./Admin');

function router(app) {
    app.use('/', homeRouter);
    app.use('/admin', adminRouter);
}

module.exports = router;
