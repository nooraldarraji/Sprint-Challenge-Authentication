const jwt = require('jsonwebtoken')
const secret = require('../config/secret.js')

function generateToken(user) {
    const payload = {
        username: user.username
    }
    const options = {
        expiresIn: '2d'
    }
    return jwt.sign(payload, secret.key , options)
}

module.exports = generateToken