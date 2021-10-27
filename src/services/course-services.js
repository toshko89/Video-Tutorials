const Courses = require('../models/Courses.js');
const User = require('../models/User.js');

const getAll = async () => Courses.find().populate('users').populate('owner').lean();

const getOne = async (courseId) => Courses.findById(courseId).populate('users').populate('owner').lean();

const createCourse = async (course) => Courses.create(course);

const updateCourse = async (courseId, newData) => Courses.findByIdAndUpdate(courseId, newData, { runValidators: true });

const deleteCourse = async (courseId) => Courses.findByIdAndDelete(courseId);

const addUser = async (courseId, personId) =>
    Courses.findByIdAndUpdate(
        { _id: courseId },
        {
            $push: { users: personId },
        },
        { runValidators: true }
    )

const addCourse = async (personId, courseId) =>
    User.findByIdAndUpdate(
        { _id: personId },
        {
            $push: { courses: courseId },
        },
        { runValidators: true }
    )

const getCoursesPerUser = async (personId) => User.findById(personId).populate('courses').lean();

const courseServices = {
    getAll,
    getOne,
    addUser,
    createCourse,
    updateCourse,
    deleteCourse,
    addCourse,
    getCoursesPerUser,
}

    module.exports = courseServices;