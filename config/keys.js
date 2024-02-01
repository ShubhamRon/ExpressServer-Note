require('dotenv').config();

if (process.env.NOTE_ENV === 'ci') {
    module.exports =  require("./ci");
} else if (process.env.NOTE_ENV === 'dev'){
    module.exports = require('./dev');
}