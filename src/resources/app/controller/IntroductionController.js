class IntroductionController {
    show(req, res) {
        res.render('introduction');
    }
}

module.exports = new IntroductionController();
