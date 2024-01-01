const mongoose = require('mongoose');
const ConnectDB = (url) => {
    return mongoose
        .connect(url)
        .then((res) => console.log(`Connected to Database.....😄`))
        .catch((err) => console.log(`Something Went Wrong While connecting to MongoDB`, err.message))
}

module.exports = { ConnectDB };