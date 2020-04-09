const express = require('express')

const usersController = require('../controllers/users.controller')

const router = express.Router()

router.post('/new', usersController.createUser)
router.put('/edit', usersController.editUser)
router.put('/delete', usersController.deleteUser)

module.exports = router