const slugify = require('slugify');

const createSlug = (str) => {
    return slugify(str+'', {
        replacement: '-',
        remove: false,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true,
    })
}

module.exports = createSlug;