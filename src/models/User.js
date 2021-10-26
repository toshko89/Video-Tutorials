const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'User name must be at least 6 characters long'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            }
        },
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: [5, 'Your password should be at least 6 characters'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            }
        },
    },

    courses: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Courses'
        }
    ]
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

userSchema.static('checkUsername', function (username) {
    return this.findOne({ username }).lean();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

