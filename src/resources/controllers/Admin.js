const AdminController = {
    // GET /admin
    index: (req, res) =>  {
        res.render('admin', {layout: 'admin'})
    }
}

module.exports = AdminController;
