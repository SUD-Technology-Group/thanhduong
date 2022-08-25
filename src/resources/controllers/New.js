const NewController = {
    index: (req, res) => {
        res.render('New');
    },

    detail:  (req, res) => {
        res.render('New/detail');
    },
}

module.exports = NewController;
