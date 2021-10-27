const courseController = require('express').Router();
const { authorization } = require('../middleWares/auth-middleWare.js');
const courseServices = require('../services/course-services.js');

courseController.get('/create', authorization, (req, res) => {
    res.render('create-course');
});

courseController.post('/create', authorization, async (req, res) => {
    try {
        let { title, description, imageUrl, isPublic } = req.body;
        if (isPublic === 'on') {
            isPublic = true;
        }
        let newCourse = { title, description, imageUrl, isPublic, owner: req.user._id };
        await courseServices.createCourse(newCourse);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.locals.error = error;
        res.render('create-course', { error: error.message });
    }
});

courseController.get('/:courseId', async (req, res) => {
    const course = await courseServices.getOne(req.params.courseId);
    const isOwn = course.owner._id == req.user?._id;
    res.render('course-details', { ...course, isOwn });
});

module.exports = courseController