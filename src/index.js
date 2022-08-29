const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const port = process.env.PORT || 8080;
const db = require('./config/db');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./resources/routes/index');
const cors = require('cors');

app.use(cors());
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        equal: function (lval, rval, options) {
            if (lval == rval) return options.fn(this)
        },
        formatCurrency: function(price) {
            return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    }
}));
app.set('views', path.join(__dirname, '/resources/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('sud'));
app.use(session({ cookie: { maxAge: 30000 } }));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));

db.connect();

//routes
router(app);

app.listen(port, () => console.log('Server started'));
