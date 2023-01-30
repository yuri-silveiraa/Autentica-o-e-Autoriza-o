const { expressjwt }  = require('express-jwt')
const { jwt } = require('../config')

module.exports = {
    jwtAuth: expressjwt({
        secret: jwt.secret,
        audience: jwt.audience,
        issuer: jwt.issuer,
        algorithms: ['HS256']
    })
}