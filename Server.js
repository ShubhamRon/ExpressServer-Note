const express = require("express");
const app = express()
const cors = require('cors');
app.use(cors());
require('dotenv').config();
app.use(express.json());

const authrouter = require('./Router/AuthRouter');
app.use('/auth', authrouter);



// Handle the route
const router = require('./Router/NoteRouter')
const AuthMiddleware = require('./MiddleWare/Authorize')
app.use('/api', AuthMiddleware, router);




const PORT = process.env.PORT || 5000;
const { ConnectDB } = require("./ConnecttoMongoDB/Connection")
const StartServer = async () => {
    try {
        await ConnectDB(process.env.MONGOURL)
        app.listen(PORT, console.log(`Server is Listening on PORT...... ${PORT}`))
    } catch (err) {
        console.log(err.message);
    }
}
StartServer();