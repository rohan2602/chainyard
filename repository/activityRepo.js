const activity = require('../models/activity');

module.exports.addActivity = async (obj) => {
    return await activity.create(obj);
}

module.exports.getActivity = async (match) => {
    return await activity.find(match);
}

module.exports.updateActivity = async(id, query) => {
    return await activity.findOneAndUpdate({ _id: id}, query, {new: true});
}