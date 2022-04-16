const User = require('../models/User');

// Home Controller
const getHome = (req, res) => {
    if (req.user._id) {
        User.findById(req.user._id, (err, user) => {
            if (err) throw err;
            res.render('pages/auth/index.njk', { user });
        });
    } else {
        res.render('pages/auth/index.njk');
    }
};

module.exports = { getHome };
