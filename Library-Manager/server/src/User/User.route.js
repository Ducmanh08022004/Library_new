const express = require('express');
const router = express.Router();

const controllerUser = require('./User.controller');

router.post('/api/register', controllerUser.registerUser);
router.post('/api/login', controllerUser.LoginUser);
router.post('/api/resetpassword', controllerUser.ResetPassword);
router.post('/api/forgotpassword', controllerUser.ForgotPassword);

module.exports = router;
