var express = require('express');
var router = express.Router();
const UserController = require('../controller/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', UserController.Signup);
router.post('/login', UserController.Login);
router.get('/oneUser', UserController.Secure, UserController.oneUser);

module.exports = router;

