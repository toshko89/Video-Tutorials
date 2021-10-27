const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const config = require('../config/config.json')

const addUser = (username, password) => User.create({ username, password });

async function login(username, password) {
    const user = await User.checkUsername(username);

    if (!user) {
        throw new Error('Wrong username or password');
    }

    const passwordVerify = await bcrypt.compare(password, user.password);

    if (!passwordVerify) {
        throw new Error('Wrong username or password');
    }

    return createToken(user);
}

function createToken(user) {
    const token = jwt.sign({ _id: user._id, username: user.username }, config.JWT_SECRET, { expiresIn: '2d' });
    return token;
};

function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const authService = {
    addUser,
    login,
    createToken,
    verifyToken
}

module.exports = authService;