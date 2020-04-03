const express = require('express')

const usersController = require('../controllers/users.controller')

const router = express.Router()

router.get('/', usersController.getUsers)
// This route will assign the value in /:id to a variable name.
// Example: /books/Titanic => { id: 'ua129hf8anb3' }
router.get('/:id', usersController.getUserById)

router.post('/new', usersController.createUser)
router.post('/edit', usersController.editUser)

router.delete('/:id', usersController.deleteUser)


module.exports = router