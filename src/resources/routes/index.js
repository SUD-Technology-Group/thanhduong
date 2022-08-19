const homeRouter = require('./home');
const introductionRouter = require('./introduction');
const productRouter = require('./product');
const newsRouter = require('./news');
const contactRouter = require('./contact');

function router(app) {
    app.use('/', homeRouter);
    app.use('/introduction', introductionRouter);
    app.use('/product', productRouter);
    app.use('/news', newsRouter);
    app.use('/contact', contactRouter);
}

module.exports = router;
