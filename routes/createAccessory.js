const express = require('express')
const router = express.Router()
const routeAccess = require('../middleware/routeAccess')
const validationCheck = require('../middleware/validationCheck')
const Accessory = require('../models/Accessory')

// GET ATTACH ACCESSORY PAGE

router.get('/', routeAccess, validationCheck, function(req, res, next) {
    res.render('createAccessory', { validated: req.validation })
})

router.post('/', (req, res) => {
    const accessory = new Accessory(req.body)
    console.log("Submitting new Accessory:", accessory)
    accessory.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("ACCESSORY SAVED, ID:", accessory._id.valueOf())
        }
    })
    res.redirect('/')
})

module.exports = router