const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { userService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const UserController = {
    // GET /user/login
    loginView: (req, res) => {
        const error = req.flash('error') || '';
        res.render('user/login', { layout: false, error });
    },

    // POST /user/login
    login: catchAsync(async (req, res) => {
        const { username, password } = req.body;
        const user = await userService.get({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    req.flash('error', 'Đăng nhập thất bại');
                    res.redirect('admin/user/login');
                } else {
                    res.cookie('AuthToken', token);
                    res.redirect('/admin');
                }
            });
        } else {
            req.flash('error', 'Tên đăng nhập hoặc mật khẩu không hợp lệ!');
            res.redirect('/admin/user/login');
        }
    }),

    // GET /user/logout
    logout: (req, res) => {
        res.clearCookie('AuthToken');
        res.redirect('/admin/user/login');
    },
};

module.exports = UserController;
