const services = require('../services/userServices');

module.exports.verifyToken = (req, res, next) => {
    //  get the token from the request
    let Bearer = null
    if (req.headers['authorization']) Bearer = req.headers['authorization'].split(' ')[1]
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || Bearer
    //  if token exists, verify the same
    //  console.log(token)
    // also verify token from session data
    // console.log(token)
    let user = null
    if (token) {
        let buff = new Buffer(config.token.secret)
        let base64data = buff.toString('base64')
        jwt.verify(token, base64data, function (err, decoded) {
            if (err) {
                //  console.log(err)
                return handle401Error({ 'message': constants.INVALID_SESSION }, req, res, next)
            }
            req.decoded = decoded
            user = decoded.id
            req.isAuthenticated = true
            //  res.status(constants.HTTP_200).json({'error': false, 'message': constants.VALID_TOKEN})
        })
        //  let dbToken = null
        let q = { email: user }
        console.log(q)
        let willGetAUser = User.findOne(q).exec()
        assert.ok(willGetAUser instanceof Promise)
        willGetAUser
            .then((doc) => {
                // console.log(doc)
                req.session.userInfo = doc
                let willGetAToken = Token.findOne(q).exec()
                assert.ok(willGetAToken instanceof Promise)
                willGetAToken
                    .then((doc) => {
                        //  dbToken = doc.token
                        console.log(doc,"Doc")
                        if(!doc) return handle401Error({'message': constants.INVALID_SESSION}, req, res, next)
                        if (doc.token !== token) return handle401Error({'message': constants.INVALID_SESSION}, req, res, next)
                        //send session
                        let resData = req.session
                        res.json({error: false, success: true, message: '', data: resData})
                    }).catch((err) =>{
                        console.log(err)
                        return handle401Error({ 'message': constants.INVALID_SESSION }, req, res, next)
                    })
            }).catch((err) => {
                console.log(err)
                return handle401Error({ 'message': constants.INVALID_SESSION }, req, res, next)
            })
    } else {
        return handle401Error({ 'message': constants.INVALID_SESSION }, req, res, next)
    }
}

module.exports.registerUser = async(req, res) => {
    try {
        await services.saveUser(req);
        res.status(200).json({error: false, success: true, message: `User with email ${req.body.email} registered successfully`});
    } catch(e) {
        res.status(400).send({ success: false, error: true, message: `${e}` });
    }
}

module.exports.authenticateUser = async(req, res) => {
    try {
        const obj = await services.authenticateUser(req);
        res.setHeader('authorization', obj.token)
        res.status(200).json({error: false, success: true, message: obj});
    } catch(e) {
        res.status(400).send({ success: false, error: true, message: `${e}` });
    }
}

