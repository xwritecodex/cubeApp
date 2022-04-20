const express = require('express');
const router = express.Router();
const validationCheck = require('../middleware/validationCheck')
const Cube = require('../models/Cube')

/* GET HOME PAGE */
router.get('/', validationCheck, async function(req, res, next) {
  const cubes = await Cube.find({}).lean()
  res.render('index', { cubes: cubes, validated: req.validation })
});

router.get('/search', validationCheck, async (req, res) => {

  // SEARCH LOGIC

  let from
  if (req.query.from == '') {
    from = 1
  } else {
    from = +req.query.from
  }

  let to
  if (req.query.to == '') {
    to = 6
  } else {
    to = +req.query.to
  }

  if (req.query.search != '') {
      const cubes = await Cube.find({})
        .where('name').equals({'$regex' : req.query.search, '$options' : 'i'})
        .where('difficultyLevel').gte(from).lte(to)
        .exec()
        res.render('index', { cubes: cubes, validated: req.validation })
  } else if (req.query.search == '') {
      const cubes = await Cube.find({})
        .where('difficultyLevel').gte(from).lte(to)
        .exec()
        res.render('index', { cubes: cubes, validated: req.validation })
  }

})

module.exports = router;