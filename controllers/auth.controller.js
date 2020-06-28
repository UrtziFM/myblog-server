const passport = require('passport')

const login = (req, res, next) => {
  passport.authenticate('login', (err, token) => {
    if (err || !token) {
      const error = new Error('There was an error login in')
      return next(error)
    }
    //res.status(200).json({ token: `Bearer ${token}` })
    else {
    res.redirect('http://localhost:3000/home')
    return}
  })(req, res, next)
}


const register = (req, res, next) => {
  passport.authenticate('register', (err, user) => {
    if (err || !user) {
      const error = new Error(err ? err.message : 'There was an error creating the user')
      return next(error)
    }

    login(req, res, next)
  })(req, res, next)
}

const isLoggedIn = (req, res, next) => {
  res.status(200).json('User is logged in')
  return
}

module.exports = {
  register,
  login,
  isLoggedIn
}
