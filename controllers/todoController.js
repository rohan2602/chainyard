const path = require('path');
const services = require('../services/activityServices');


module.exports.getActivity = async (req, res) => {
    try {
        const activitys = await services.getActivity(req);
        res.status(200).send({ body: activitys });
    } catch(e) {
        res.status(400).send({ message: `${e}` });
    }
}

module.exports.saveActivity = async (req, res) => {
    try {
        const obj = await services.saveActivity(req);
        res.status(200).send({message: 'Todo created successfully', obj });
    } catch(e) {
        res.status(400).send({ message: `${e}` });
    }
}

module.exports.updateActivity = async(req, res) => {
    try {
        const obj = await services.updateActivity(req);
        res.status(200).send({message: 'Todo updated successfully', obj });
    } catch(e) {
        res.status(400).send({ message: `${e}` });
    }
}

module.exports.deleteActivity = async(req, res) => {
    try {
        const obj = await services.deleteActivity(req);
        res.status(200).send({ message: 'Todo deleted successfully', obj });
    } catch(e) {
        res.status(400).send({ message: `${e}` });
    }
}