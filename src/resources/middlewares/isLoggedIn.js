const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.session.token
    if (!token) {
        res.status(403)
        req.flash('error', 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
        return res.redirect('/admin/user/login')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(403)
            req.flash('error', 'Token không hợp lệ vui lòng đăng nhập lại')
            return res.redirect('/admin/user/login')
        }
        next()
    })
}