const express = require('express')

const usersController = require('../controllers/users.controller')

const router = express.Router()

router.get('/', usersController.getUsers)

router.get('/:id', usersController.getUserById)

router.post('/new', usersController.createUser)

router.put('/edit', usersController.editUser)

router.delete('/:id', usersController.deleteUser)

module.exports = router