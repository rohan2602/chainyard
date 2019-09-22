const Joi = require("joi");

module.exports.registerUserActivity = (req, res, next) => {
    const userSchema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().regex(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).required(),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    });

    Joi.validate(req.body, userSchema).then(success => {
        next();
    }).catch(validationError => {
        const errorMessage = validationError.details.map(d => d.message);
            return res.status(400).json({
                success: false,
                error: true,
                message: errorMessage
            })
    })
}

module.exports.loginUser = (req, res, next) => {
    const userSchema = Joi.object().keys({
        email: Joi.string().regex(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).required(),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    });

    Joi.validate(req.body, userSchema).then(success => {
        next();
    }).catch(validationError => {
        const errorMessage = validationError.details.map(d => d.message);
            return res.status(400).json({
                success: false,
                error: true,
                message: errorMessage
            })
    })
}