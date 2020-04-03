const createError = require('http-errors');

const User = require ('../model/User');

const getUsers = (req, res, next) => {
    User.find()
      .then(users => {
        res.status(200).render('users', { users: users })
      })
      .catch(err => {
        next(err)
      })
  }
  
  // We will receive the book id in req.params.id
  const getUserById = (req, res, next) => {
    const id = req.params.id
  
    User.findById(id)
      .populate('users')
      .then(user => {
        res.status(200).render('user', { user: user })
      })
      .catch(() => {
        next(createError(404))
      })
  }
  
  const createUser = (req, res, next) => {
  const newUser = new User({
  
    user = req.body.user,
    password = req.body.password,
    name = req.body.name,
    email = req.body.email,
    gender = req.body.gender,
    date = req.body.date,
    age = req.body.age,
})
    newUser
    .save()
    .then(() => {
      res.redirect('/users')
    })
    .catch(err => {
      next(err)
  });
}

const editUser = (req, res, next) => {
    const id = req.body.id
    const user = req.body.user
    const password = req.body.password
    const name = req.body.name
    const email = req.body.email
    const gender = req.body.gender
    const date = req.body.date
    const age = req.body.age
  
    Book.findByIdAndUpdate(id, { user, password, name, email, gender, date, age })
      .then(() => {
        res.redirect('/users')
      })
      .catch(err => {
        next(err)
      })
  }
  
  const deleteUser = (req, res, next) => {
    const id = req.params.id
  
    User.findByIdAndDelete(id)
      .then(() => {
        res.status(200).json('Deleted user!')
      })
      .catch(err => {
        next(err)
      })
  }
  

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser
};

