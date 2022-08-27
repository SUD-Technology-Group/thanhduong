const NewController = {
    index: (req, res) => {
        res.render('New/index');
    },

    detail: (req, res) => {
        res.render('New/detail');
    },
};

module.exports = NewController;
