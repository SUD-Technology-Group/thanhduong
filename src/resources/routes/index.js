const homeRouter = require('./Home');
const aboutRouter = require('./About');
const productRouter = require('./Product');
const newsRouter = require('./News');
const contactRouter = require('./Contact');
const adminRouter = require('./Admin');

function router(app) {
    app.use('/', homeRouter);
    app.use('/about', aboutRouter);
    app.use('/products', productRouter);
    app.use('/news', newsRouter);
    app.use('/contact', contactRouter);
    app.use('/admin', adminRouter);
}

module.exports = router;
