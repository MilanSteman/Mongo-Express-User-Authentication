const express = require('express');
const nunjucks = require('nunjucks');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3000;
const THOUSAND_HOURS = 3600000;

/**
 * Routes
 */
const authRoutes = require('./src/routes/AuthRoutes');

/**
 * Database helpers
 */
const connectToDB = require('./src/config/mongoose.js');
const checkUser = require('./src/config/passport.js');

require('dotenv').config();

nunjucks.configure('src/views/', {
    autoescape: true,
    express: app,
});

app.use(express.static('static/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET,
        maxAge: new Date(Date.now() + THOUSAND_HOURS),
        store: new MongoStore({
            mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        }),
        resave: true,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);

connectToDB();
checkUser();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
