const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.cookies['AuthToken']
    if (!token) {
        res.status(403)
        req.flash('error', 'Vui lòng đăng nhập.')
        return res.redirect('/admin/user/login')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(403)
            req.flash('error', 'Vui lòng đăng nhập.')
            return res.redirect('/admin/user/login')
        }
        next()
    })
}