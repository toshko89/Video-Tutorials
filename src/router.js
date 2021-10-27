const router = require('express').Router();
const authController = require('./controllers/authController.js');
const courseController = require('./controllers/courseContoller.js');
const homeController = require('./controllers/homeController.js');

router.use(homeController);
router.use(authController);
router.use('/courses', courseController);
router.use('*',(req,res)=>{
    res.render('404');
})


module.exports = router;