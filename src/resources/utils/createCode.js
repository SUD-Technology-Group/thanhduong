const shortId = require('shortid');

function createCode() {
    const date = new Date().toLocaleDateString('vi-VN').replaceAll('/', '');
    return date + shortId.generate();
}

module.exports = createCode;
