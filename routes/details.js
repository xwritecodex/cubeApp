const express = require('express')
const router = express.Router({ mergeParams: true })
const validationCheck = require('../middleware/validationCheck')
const Cube = require('../models/Cube')
const Accessory = require('../models/Accessory')
const User = require('../models/User')

// GET DETAILS PAGE

router.get('/', validationCheck, async function(req, res, next) {
    console.log("Retrieving details for ID", req.params.id)
    const cube = await Cube.findById(req.params.id).populate('accessories')
    let creatorAccess = false
    if (cube.creator.valueOf() == req.user) {
        creatorAccess = true
    }
    const creator = await User.findById(cube.creator)

    // MANUALLY POPULATE ACCESSORIES

    // const accessories = await Accessory.find({})
    // let attachedAccessories = []
    // cube.accessories.forEach((id) => {
    //     accessories.forEach((e, i) => {
    //         if (id.valueOf() == e._id) {
    //             attachedAccessories.push(e)
    //         }
    //     })
    // })
    // console.log("Accessories are", attachedAccessories)

    console.log("Accessories are", cube.accessories)

    res.render('details', { cube: cube, 
        // accessories: attachedAccessories, 
        accessories: cube.accessories,
        validated: req.validation,
        creatorAccess: creatorAccess,
        creator: creator
    })
})

module.exports = router