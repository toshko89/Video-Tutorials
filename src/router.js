const router = require('express').Router();
const authController = require('./controllers/authController.js');
const homeController = require('./controllers/homeController.js');

router.use(homeController);
router.use(authController);


module.exports = router;