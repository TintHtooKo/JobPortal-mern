const jwt = require('jsonwebtoken')

const maxAge = 60 * 60 * 24

module.exports = function createToken(_id) {
    return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:maxAge})
}