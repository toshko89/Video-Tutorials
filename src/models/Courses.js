const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        unique: [true, 'Title is taken please choose new'],
        type: String,
        required: true,
        minlength: [4, 'Title must be at least 6 characters'],
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description must be at least 20 characters'],
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\//i.test(v);
            }
        }
    },
    createdAt: {
        type: Date, 
        default: Date.now 
    },
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
},
    {
        timestamps: true
    });

const Courses = mongoose.model('Courses', courseSchema);

module.exports = Courses;