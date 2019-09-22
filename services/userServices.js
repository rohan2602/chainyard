const UserRepo = require('../repository/userRepo');
const bcryptjs = require('bcryptjs');
const util = require('util');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports.saveUser = async (req) => {
    const genSaltPromise = util.promisify(bcryptjs.genSalt);
    const genHash = util.promisify(bcryptjs.hash);
    const salt = await genSaltPromise(10);
    const hashedPass = await genHash(req.body.password, salt);

    let User = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    }
    return await UserRepo.createNewUser(User);
}

module.exports.authenticateUser = async(req) => {
    const query = { email: req.body.email };
    let user = await UserRepo.findUser(query);
    const comparePromise = util.promisify(bcryptjs.compare);
    if (user.length > 0) {
        user = user[0];
        const isVerified = await comparePromise(req.body.password, user.password);
        if (isVerified) {
            
            let buff = new Buffer(config.token.secret);
            let base64data = buff.toString('base64');
            const jwtObj = {
                email: user.email, 
                name: user.name
            };
            let token = jwt.sign(jwtObj, base64data, {
                expiresIn: config.token.validity,
            });
            // let refreshToken = jwt.sign(jwtObj, base64data, {
            //     expiresIn: config.token.refreshValidity,
            // });
            return {
                status: 'logged in',
                token: token
                // refreshToken: refreshToken,
            };
        } else {
            throw new Error('Authentication failed for the user');
        }
    } else {
        throw new Error('User not Found!!');
    }
}
