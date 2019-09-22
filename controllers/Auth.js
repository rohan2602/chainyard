const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('../config/config');

module.exports.verifyToken = async (req, res, next) => {
    if (req.headers["authorization"]) {
        try {
            const jwtPromise = util.promisify(jwt.verify);
            let buff = new Buffer(config.token.secret);
            let base64data = buff.toString('base64');
            const isVerified = await jwtPromise(req.headers["authorization"], base64data);
            if (isVerified) {
                req.user = isVerified.email;
                next();
            } else {
                res.status(401).send({ success: false, error: true, message: `Invalid token provided` });
            }
        } catch(e) {
            res.status(401).send({ success: false, error: true, message: e });
        }
    } else {
        res.status(401).send({ success: false, error: true, message: 'Token was not provided' });
    }
    
        
}