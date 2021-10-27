const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router.js');
const { authentication } = require('./middleWares/auth-middleWare.js');

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, './static')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('views', path.resolve(__dirname, './views'));

app.engine('hbs', handlebars({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.use(authentication);
app.use(router);

mongoose.connect('mongodb://localhost:27017/videos')
    .then(app.listen(port, () => console.log(`Express running on port: ${port}...`)))
    .catch(err => {
        console.log(err);
    });

