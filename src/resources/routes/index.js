const homeRouter = require('./Home');
const aboutRouter = require('./About');
const productRouter = require('./Product');
const newRouter = require('./New');
const contactRouter = require('./Contact');
const adminRouter = require('./Admin');

function router(app) {
    app.use('/', homeRouter);
    app.use('/about', aboutRouter);
    app.use('/products', productRouter);
    app.use('/news', newRouter);
    app.use('/contact', contactRouter);
    app.use('/admin', adminRouter);
}

module.exports = router;
