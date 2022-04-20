const express = require('express')
const router = express.Router({ mergeParams: true })
const routeAccess = require('../middleware/routeAccess')
const validationCheck = require('../middleware/validationCheck')
const Cube = require('../models/Cube')
const Accessory = require('../models/Accessory')

// GET DETAILS PAGE

router.get('/', routeAccess, validationCheck, async function(req, res, next) {
    console.log("Retrieving details for ID", req.params.id)
    const cube = await Cube.findById(req.params.id)
    const accessories = await Accessory.find({})
    res.render('attachAccessory', { cube: cube, accessories: accessories, validated: req.validation })
})

// Alternate GET Method

// router.get('/', function(req, res, next) {
//     console.log("Retrieving details for ID", req.params.id)
//     Cube.findById(req.params.id).then(cube => {
//         Accessory.find({}).lean().then(accessories => {
//             // res.render('attachAccessory', { accessories: accessories })
//             res.render('attachAccessory', { cube: cube, accessories: accessories })
//         })
//     })
// })

router.post('/', async (req, res) => {
    const accessory = await Accessory.findById(req.body.accessory).exec()
    const cube = await Cube.findById(req.params.id)
    console.log(accessory)
    Cube.findByIdAndUpdate(req.params.id, { $push: { accessories: accessory } }).exec()
    console.log(`Attached accessory ${accessory.name} to cube ${cube.name}`)
    res.redirect('/')
})

module.exports = router