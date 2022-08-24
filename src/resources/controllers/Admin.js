const AdminController = {
    index: (req, res) =>  {
        res.render('admin', { layout: 'admin'})
    }
}

module.exports = AdminController;
