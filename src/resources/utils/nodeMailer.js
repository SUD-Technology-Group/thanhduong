const nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = nodemailer.createTransport({
    // config mail server
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_APP_PASS,
    },
});
