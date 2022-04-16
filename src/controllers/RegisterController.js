/*
 * Register Controller
 */

const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10;

/**
 * This function renders the register page.
 */
const getRegister = (req, res) => {
    res.render('pages/auth/register.njk');
};

/**
 * This function handles the registering process. It will take a number of user inputs and store / encrypt (where neccessary) them.
 */
const registerUser = (req, res) => {
    const { username, email, password } = req.body;

    User.findOne({ username }).then((result) => {
        // If username is already registered, redirect the user back to register
        if (result) {
            res.redirect('/register');
        } else {
            // Otherwise create a new User with the user input.
            const addUser = new User({
                username,
                email,
                password,
            });

            // Hash the password
            bcrypt.hash(addUser.password, saltRounds, (err, hash) => {
                if (err) throw err;
                addUser.password = hash;
                addUser.save();

                // Automatically login user after registering
                // https://www.passportjs.org/docs/login/
                req.login(addUser, (err) => {
                    if (err) throw err;
                    res.redirect('/');
                });
            });
        }
    });
};

module.exports = { getRegister, registerUser };
