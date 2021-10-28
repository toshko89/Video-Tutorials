const courseController = require('express').Router();
const { authorization, isOwner } = require('../middleWares/auth-middleWare.js');
const courseServices = require('../services/course-services.js');

courseController.get('/create', authorization, (req, res) => {
    res.render('create-course');
});

courseController.post('/create', authorization, async (req, res) => {
    try {
        let { title, description, imageUrl, isPublic } = req.body;
        isPublic = isPublic === 'on' ? true : false;
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
    try {
        const course = await courseServices.getOne(req.params.courseId);
        const isOwn = course.owner._id == req.user?._id;
        const isEnrolled = course.users.some(user => user._id == req.user?._id);
        res.render('course-details', { ...course, isOwn, isEnrolled });
    } catch (error) {
        console.log(error);
        res.render('course-details', { error: error.message });
    }
});

courseController.get('/:courseId/enroll', authorization, isOwner, async (req, res) => {
    try {
        if (req.user.isOwner) {
            throw new Error('The creator of the course can\'t enroll for it');
        }
        await courseServices.addUser(req.params.courseId, req.user._id);
        await courseServices.addCourse(req.user._id, req.params.courseId);
        res.redirect(`/courses/${req.params.courseId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

courseController.get('/:courseId/edit', isOwner, async (req, res) => {
    try {
        const course = await courseServices.getOne(req.params.courseId);
        res.render('edit-course', { ...course });
    } catch (error) {
        console.log(error);
        res.render('edit-course', { error: error.message });
    }
});

courseController.post('/:courseId/edit', isOwner, async (req, res) => {
    try {
        let { title, description, imageUrl, isPublic } = req.body;
        isPublic = isPublic === 'on' ? true : false;
        let editedCourse = { title, description, imageUrl, isPublic, owner: req.user._id };
        await courseServices.updateCourse(req.params.courseId, editedCourse);
        res.redirect(`/courses/${req.params.courseId}`);
    } catch (error) {
        console.log(error);
        res.render('edit-course', { error: error.message });
    }
});

courseController.get('/:courseId/delete', isOwner, async (req, res) => {
    try {
        await courseServices.deleteCourse(req.params.courseId);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('index', { error: error.message });
    }
});


module.exports = courseController