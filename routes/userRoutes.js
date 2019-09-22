const router = require('express').Router();
const userController = require('../controllers/userController');
const userMiddleWare = require('../middlewares/userMiddleWare');

router.route('/registeruser/')
    .all(userMiddleWare.registerUserActivity)
    .post(userController.registerUser)

router.route('/signin/')
    .all(userMiddleWare.loginUser)
    .post(userController.authenticateUser)

module.exports = router;