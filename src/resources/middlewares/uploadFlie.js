const multer = require('multer');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = `src/public/uploads/${file.fieldname}`;
        if (!fs.existsSync(path))
            fs.mkdirSync(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + ext);
    },
});

module.exports = multer({ storage: storage });
