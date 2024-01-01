const JWT = require("jsonwebtoken");
require('dotenv').config();


const User_Authentication = async (req, res, next) => {
    const { token } = req.headers;
    try {
        if(!token || !token.startsWith("Bearer")){
            res.status(401).json({ status:"Not Acceptable", message: "Invalid Token" })
            return;
        }
        const TOKEN =token.split(' ')[1];
        const Payload = JWT.verify(TOKEN, process.env.JWT_SECRET_KEY)
        req.user = { ID: Payload.ID, username: Payload.username };
        res.set('ExpiresIn', `${req.user.exp}`)
        next();
    } catch (err) {
        res.status(401).json({ status: "Failed", message: err.message })
    }
}

module.exports = User_Authentication; 