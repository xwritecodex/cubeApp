const express = require('express')
const router = express.Router()
const routeAccess = require('../middleware/routeAccess')
const validationCheck = require('../middleware/validationCheck')
const Cube = require('../models/Cube')

// GET CREATE PAGE

router.get('/', routeAccess, validationCheck, function(req, res, next) {
    res.render('create', { validated: req.validation })
})

router.post('/', routeAccess, (req, res) => {
    const cube = new Cube(req.body)
    cube.creator = req.user
    console.log("Submitting new Cube:", cube)
    cube.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("CUBE SAVED, ID:", cube._id.valueOf())
        }
    })
    res.redirect('/')
})

module.exports = router