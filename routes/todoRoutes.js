const router = require('express').Router();
const path = require('path');
const todoContoller = require(path.resolve('./controllers/todoController'));
const middleWare = require(path.resolve('./middlewares/activityMiddleWare'));

router.route('/getactivity/:activityName?')
    .get(todoContoller.getActivity)

router.route('/createactivity')
    .all(middleWare.validateSaveActivity)
    .post(todoContoller.saveActivity)

router.route('/deleteactivity/:id')
    .all(middleWare.validateDeleteActivity)
    .delete(todoContoller.deleteActivity)

router.route('/updateactivity')
    .all(middleWare.validateUpdateActivity)
    .put(todoContoller.updateActivity)

module.exports = router;
