const User = require('../models/users');

module.exports.createNewUser = async (obj) => {
    return await User.create(obj);
}

module.exports.findUser = async(query) => {
    return await User.find(query);
}