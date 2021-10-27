const authController = require('express').Router();
const User = require('../models/User.js');
const authService = require('../services/auth-service.js');
const config = require('../config/config.json')

authController.get('/register',(req,res)=>{
    res.render('register')
});

authController.post('/register', async (req, res) => {
    try {
        let {  username, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            throw new Error('Password doesn\'t match, please try again');
        }
        if (username.trim() == '' || password.trim() == '' || repeatPassword.trim() == '') {
            throw new Error('All fields are required!');
        }

        const userCheck = await User.checkUsername(username);
        if (userCheck) {
            throw new Error('Username is taken, please try again')
        }

        const user = await authService.addUser(username, password);
        const token = authService.createToken(user);
        res.cookie(config.TOKEN_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.render('register', { error: error.message });
    }

});

authController.get('/login', (req, res) => {
    res.render('login')
});

authController.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        let userToken = await authService.login(username, password);
        res.cookie('app_token', userToken, { httpOnly: true });
        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.render('login', { error: error.message });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie(config.TOKEN_COOKIE_NAME);
    res.redirect('/');
})

module.exports = authController;