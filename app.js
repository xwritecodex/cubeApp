const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const hbs = require('hbs')



// HIDE YOUR MONGO CONNECTION VARIABLES 

require('dotenv').config();
// const saltRounds = +process.env.SALT
// const secretKey = process.env.JWT_SECRET


// MONGO DB CONNECTION

mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(res => console.log("MongoDB connected!"))
.catch(err => console.log(err))


// ESTABLISH ROUTES

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about')
const usersRouter = require('./routes/users');
const detailsRouter = require('./routes/details')
const createRouter = require('./routes/create')
const editRouter = require('./routes/edit')
const deleteRouter = require('./routes/delete')
const createAccessoryRouter = require('./routes/createAccessory')
const attachAccessoryRouter = require('./routes/attachAccessory')

const app = express();


// VIEW ENGINE SETUP

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')


// UNRESTRICTED ROUTES

app.use('/', indexRouter);
app.use('/about', aboutRouter)
app.use('/users', usersRouter);
app.use('/details/:id', detailsRouter)
app.use('/users/register', usersRouter)
app.use('/users/login', usersRouter)
app.use('/users/logout', usersRouter)

// RESTRICTED ROUTES

app.use('/create', createRouter)
app.use('/edit/:id', editRouter)
app.use('/delete/:id', deleteRouter)
app.use('/createAccessory', createAccessoryRouter)
app.use('/attachAccessory/:id', attachAccessoryRouter)


// CATCH 404 AND FORWARD TO ERROR HANDLER

app.use(function(req, res, next) {
  next(createError(404));
});


// ERROR HANDLER

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


// RENDER THE ERROR PAGE

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;