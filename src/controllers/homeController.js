const homeController = require('express').Router();
const { authorization } = require('../middleWares/auth-middleWare.js');
const courseServices = require('../services/course-services.js');

homeController.get('/', async (req, res) => {
    try {
        const course = await courseServices.getAll();
        res.render('index', { course });
    } catch (error) {
        console.log(error);
        res.render('index', { error: error.message });
    }
});

homeController.get('/profile', authorization, (req, res) => {
    const user = req.user;
    res.render('myProfile', { user });
});

module.exports = homeController;