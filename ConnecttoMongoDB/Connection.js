const mongoose = require('mongoose');

// This Will help to Connect with MONGODB with provided URL
const ConnectDB = (url) => {
    return mongoose
        .connect(url)
        .then((res) => console.log(`Connected to Mongodb Database.....😄`))
        .catch((err) => console.log(`Something Went Wrong While connecting to MongoDB`, err.message))
}

module.exports = { ConnectDB };