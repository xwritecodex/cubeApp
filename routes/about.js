const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const validationCheck = require('../middleware/validationCheck')


// GET ABOUT PAGE

router.get('/', validationCheck, function(req, res, next) {
    res.render('about', { validated: req.validation })
})

module.exports = router