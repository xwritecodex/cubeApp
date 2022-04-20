const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET


// AUTHENTICATE JWT

const validationCheck = function validationCheck(req, res, next) {
    jwt.verify(req.cookies.access_token, secretKey, (err, decoded) => {
        if (err) {
            console.log('NOT VALIDATED')
            req.validation = false
            next()
        } else {
            req.validation = true
            req.user = decoded.id
            next()
        }
    })
}

module.exports = validationCheck