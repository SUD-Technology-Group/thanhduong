const port = process.env.PORT || 8080;
const db = require('./config/db');
const router = require('./resources/routes');
const server = require('./config/server');

const app = server.init();

db.connect();

//routes
router(app);

app.listen(port, () => console.log('Server started'));
