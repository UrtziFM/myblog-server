const User = require ('../model/User');

  
  const createUser = (req, res, next) => {
  const newUser = new User({
  
    email : req.body.email,
    password : req.body.password,
})
    newUser
    .save()
    .then(() => {
      res.status(200).json('User Created!')
    })
    .catch(err => {
      next(err)
  });
}

const editUser = (req, res, next) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password
  
    Book.findByIdAndUpdate(id, { email, password })
      .then(() => {
        res.status(200).json('User updated!')
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
  createUser,
  editUser,
  deleteUser
};

