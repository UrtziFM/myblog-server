const express = require('express')

const userController = require('../controllers/users.controller')

const router = express.Router()

router.route('/all').get(userController.findAllusers);
router.route('/')
    .post(userController.addUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
