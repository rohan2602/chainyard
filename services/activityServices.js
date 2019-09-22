const repository = require('../repository/activityRepo');

module.exports.getActivity = async(req) => {
    let match;
    if (req.params.activityName) {
        match = { activityName: req.params.activityName, createdBy: req.user, isDeleted: false };
    } else {
        match = { createdBy: req.user, isDeleted: false };
    }
    return await repository.getActivity(match);
}

module.exports.saveActivity = async (req) => {
    const body = req.body;
    let obj = {
        activityName: body.activityName,
        description: body.description,
        createdBy: req.user
    }
    return await repository.addActivity(obj);
}

module.exports.deleteActivity = async (req) => {
    let obj = {
        isDeleted: true,
        modifiedAt: new Date()
    }
    return await repository.updateActivity(req.params.id, obj);
}

module.exports.updateActivity = async (req) => {
    const body = req.body;
    let obj = {
        activityName: body.activityName,
        description: body.description,
        modifiedAt: new Date()
    }
    return await repository.updateActivity(req.body.id, obj);
}
