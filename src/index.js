const port = process.env.PORT || 8080;
const db = require('./config/db');
const router = require('./resources/routes');
const loader = require('./config/loader');

const app = loader.init();

db.connect();

//routes
router(app);

app.listen(port, () => console.log('Server started'));
