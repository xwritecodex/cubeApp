const express = require('express')
const router = express.Router({ mergeParams: true })
const routeAccess = require('../middleware/routeAccess')
const validationCheck = require('../middleware/validationCheck')
const Cube = require('../models/Cube')


// GET DELETE PAGE

router.get('/', routeAccess, validationCheck, async function(req, res, next) {
    const cube = await Cube.findById(req.params.id)
    res.render('delete', {cube: cube, validated: req.validation})
})

router.post('/', async function(req, res) {
    await Cube.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router