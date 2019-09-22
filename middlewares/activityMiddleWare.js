const path = require('path');
const Joi = require("joi");

module.exports.validateSaveActivity = (req, res, next) => {
    const activitySchema = Joi.object().keys({
        activityName: Joi.string().required(),
        description: Joi.string().allow("")
    });
    Joi.validate(req.body, activitySchema)
        .then(validate => {
            next();
        })
        .catch(validationError => {
            const errorMessage = validationError.details.map(d => d.message);
            return res.status(400).json({
                success: false,
                error: true,
                message: errorMessage
            })
            //reject(errorMessage);
        });
}

module.exports.validateDeleteActivity = (req, res, next) => {
    const paramsSchema = Joi.object().keys({
        id: Joi.string().required()
    });
    Joi.validate(req.params, paramsSchema)
        .then(validate => {
            next();
        })
        .catch(validationError => {
            const errorMessage = validationError.details.map(d => d.message);
            return res.status(400).json({
                success: false,
                error: true,
                message: errorMessage
            })
            //reject(errorMessage);
        });
}

module.exports.validateUpdateActivity = (req, res, next) => {
    const bodySchema = Joi.object().keys({
        id: Joi.string().required(),
        activityName: Joi.string().required(),
        description: Joi.string().allow("")
    });
    Joi.validate(req.body, bodySchema)
        .then(validate => {
            next();
        })
        .catch(validationError => {
            const errorMessage = validationError.details.map(d => d.message.replace("\"", ""));
            return res.status(400).json({
                success: false,
                error: true,
                message: errorMessage
            })
            //reject(errorMessage);
        });
}
    