const port = process.env.PORT || 8080;
const db = require('./config/db');
const router = require('./resources/routes');
const server = require('./config/server');

const app = server.init();

db.connect();

//routes
router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render('error', { layout: false });
});

app.listen(port, () => console.log('Server started'));
