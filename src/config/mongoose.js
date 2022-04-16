const mongoose = require('mongoose');

const connectToDB = () => {
    let uri;
    if (process.env.DB_USER) {
        uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    }

    if (uri) {
        mongoose
            .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connected to Database');
            })
            .catch((err) => {
                throw err;
            });
    }
};

module.exports = connectToDB;