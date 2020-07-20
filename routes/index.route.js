const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/login')
    .post(authController.authUser, authController.getToken);

router.route('/verify')
    .post(authController.verifyToken);

module.exports = router;
