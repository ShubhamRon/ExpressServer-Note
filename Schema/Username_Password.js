const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const username_password = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is must"],
        unique: true,
        min: 2
    },
    password: {
        type: String,
        required: [true, "password is must to have"],
        min: 3
    }
})

// This One Used to Hash-the-Password
username_password.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
}) 

// Create the JWT-TOKEN to be used in Each Request
username_password.methods.createJWT = function () {
    return jwt.sign({ ID: this._id, username: this.username }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })
}

// Compare Passwords
username_password.methods.comparepasswords = async function(password){
    const Ismatch = await bcrypt.compare(password, this.password)
    return Ismatch;
}

module.exports = mongoose.model("UsernameAndpassword", username_password)
 