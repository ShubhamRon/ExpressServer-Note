const express = require('express');
const { CreateUserPassword, Check_UserId_Password } = require('../Controller/UserAuthentication_Controller');
const router = express.Router()

// This Will Verify
router.post('/register', CreateUserPassword);
router.post('/sign_in', Check_UserId_Password);


module.exports = router