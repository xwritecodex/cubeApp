const express = require('express')
const router = express.Router({ mergeParams: true })
const routeAccess = require('../middleware/routeAccess')
const validationCheck = require('../middleware/validationCheck')
const Cube = require('../models/Cube')


// GET EDIT PAGE

router.get('/', routeAccess, validationCheck, async function(req, res, next) {
    const cube = await Cube.findById(req.params.id).exec()
    res.render('edit', {cube: cube, validated: req.validation})
})

// router.post('/', async function(req, res) {
//     const cube = await Cube.findByIdAndUpdate(req.params.id, req.body)
//     res.redirect('/')

// })

module.exports = router