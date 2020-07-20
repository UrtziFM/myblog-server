require('dotenv').config()
require('./config/db')

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware')
const hbs = require('hbs')

const passport = require('passport')
require('./config/passport')


const indexRouter = require('./routes/index.route');
const postsRouter = require('./routes/posts.route')
const usersRouter = require('./routes/users.route')
const authRouter = require('./routes/auth.route')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');
// To handle passing data as arguments in hbs functions, we need to stringify them as JSON.
// This function creates a helper to use as {{ json value }}
hbs.registerHelper('json', context => {
  return JSON.stringify(context)
})

//Cors middleware, making available it
app.use(cors());


app.options('*', cors()) // enable pre-flight request for DELETE request
app.delete('*', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(3002, function () {
  console.log('CORS-enabled web server listening on port 80')
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// IMPORTANT: Use SassMiddleware always before express.static to parse the CSS before rendering the page.
app.use(
  sassMiddleware({
    src: path.join(__dirname, './public'), // Source folder with SCSS files
    dest: path.join(__dirname, './public'), // Destination folder to save the CSS files we will use
    debug: true,
    outputStyle: 'compressed' // Compress the produced CSS.
  })
)
app.use(express.static(path.join(__dirname, './public')));
app.use(passport.initialize())
app.use(passport.session());

app.use('/', indexRouter);
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).render('error')
});

module.exports = app;
