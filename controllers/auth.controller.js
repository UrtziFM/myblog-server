const passport = require('passport')

const login = (req, res, next) => {
  passport.authenticate('login', (err, token) => {
    console.log('it is you')
    if (err || !token) {
      console.log('error in log')
      const error = new Error('There was an error login in')
      return next(error)
    }
    res.status(200).json({ token: `Bearer ${token}` })
    return
  })(req, res, next)
}


const register = (req, res, next) => {
  passport.authenticate('register', (err, user) => {
    console.log('Hello')
    if (err || !user) {
      const error = new Error(err ? err.message : 'There was an error creating the user')
      return next(error)
    }
    console.log('Hello1')

    login(req, res, next)
  })(req, res, next)
 // {
 //   res.redirect('/posts')
 //   return
 // }
}

const isLoggedIn = (req, res, next) => {
  console.log('failed')
  res.status(200).json('User is logged in')
  return
}

module.exports = {
  register,
  login,
  isLoggedIn
}
