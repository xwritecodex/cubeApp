const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET


// AUTHENTICATE JWT

const routeAccess = function routeAccess(req, res, next) {
    console.log("Verifying credentials...")
    jwt.verify(req.cookies.access_token, secretKey, (err, decoded) => {
        if (err) {
            console.log('ACCESS DENIED')
            res.redirect('/')
        } else {
            console.log("ACCESS GRANTED")
            req.user = decoded.id
            console.log(req.user)
            next()
        }
    })
}

module.exports = routeAccess