const pagesRouter = require('./Pages');
const adminRouter = require('./Admin');

function router(app) {
    app.use('/admin', adminRouter);
    app.use('/', pagesRouter);
    app.get('*', function (req, res, next) {
        res.render('error', { title: 'Page not found', layout: '' });
    });
}

module.exports = router;
