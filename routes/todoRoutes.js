const router = require('express').Router();
const path = require('path');
const todoContoller = require(path.resolve('./controllers/todoController'));
const middleWare = require(path.resolve('./middlewares/activityMiddleWare'));

router.route('/getactivity/:activityName?')
    .get(todoContoller.getActivity)

router.route('/createactivity')
    .post(middleWare.validateSaveActivity)
    .post(todoContoller.saveActivity)

router.route('/deleteactivity/:id')
    .delete(middleWare.validateDeleteActivity)
    .delete(todoContoller.deleteActivity)

router.route('/updateactivity')
    .put(middleWare.validateUpdateActivity)
    .put(todoContoller.updateActivity)

module.exports = router;