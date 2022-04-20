const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = +process.env.SALT
const secretKey = process.env.JWT_SECRET


/* GET REGISTER PAGE */

router.get('/register', async function(req, res, next) {
  console.log(await User.find({}))
  res.render('register')
});

router.post('/register', (req, res) => {
  console.log(req.body)
  const {username, password, repeatPassword} = req.body;
  console.log(username, password, repeatPassword);
  if (password != repeatPassword) {
    res.send("passwords do not match, try again ;)")
  } else {
    res.send("POST register a new user");
    //has password with bcrypt
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log("password hash is ", hash);
    const newUser = new User({
      username,
      password: hash
    })
    newUser.save()
  }
  res.redirect('login')
})


/* GET LOGIN PAGE */

router.get('/login', async function(req, res, next) {
  // console.log(await User.find({}))
  res.render('login')
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body

  const user = await User.findOne({username: username})

  const match = await bcrypt.compare(password, user.password)
  console.log(match)

  if (match) {
    
    const payload = { id: user._id, username: username }
    // const options = { expiresIn: '1d' }
    const token = jwt.sign(payload, secretKey)
    console.log(token)

    res.cookie('access_token', token)

    res.redirect('/')

  } else {
    res.redirect('login')
  }
})

// LOGOUT

router.get('/logout', function(req, res, next) {
  res.clearCookie('access_token')
  console.log("USER LOGGED OUT")
  res.redirect('/')
});

module.exports = router;