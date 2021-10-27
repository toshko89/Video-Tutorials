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

homeController.get('/profile', authorization, async (req, res) => {
    try {
        const user = req.user;
        let myCourses = await courseServices.getCoursesPerUser(req.user._id);
        myCourses = myCourses.courses.map(x => x.title);
        console.log(myCourses);
        res.render('myProfile', { user, myCourses });
    } catch (error) {
        console.log(error);
    }
});

module.exports = homeController;