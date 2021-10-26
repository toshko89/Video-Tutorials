const homeController = require('express').Router();

homeController.get('/',(req,res)=>{
    res.render('index');
});

module.exports = homeController;