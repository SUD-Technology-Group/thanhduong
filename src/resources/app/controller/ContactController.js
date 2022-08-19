class ContactController {
    show(req, res) {
        res.render('contact');
    }
}

module.exports = new ContactController();
