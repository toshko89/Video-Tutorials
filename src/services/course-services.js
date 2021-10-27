const Courses = require('../models/Courses.js');

const getAll = async () => Courses.find().populate('users').populate('owner').lean();

const getOne = async (courseId) => Courses.findById(courseId).populate('users').populate('owner').lean();

const createCourse = async (course) => Courses.create(course);

const courseServices = {
    getAll,
    getOne,
    createCourse,
}

module.exports = courseServices;