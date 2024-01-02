const express = require('express');
const { CreateUserPassword, Check_UserId_Password } = require('../Controller/UserAuthentication_Controller');
const router = express.Router()

// This Will Let user to create Password and UserID
router.post('/register', CreateUserPassword);
// Get Bearer Token
router.post('/sign_in', Check_UserId_Password);


module.exports = router