var express = require('express');
var router = express.Router();
var { login, register, getOneUser } = require('../controllers/users')

/* GET users listing. */
router.get('/', getOneUser)

router.post('/register',register)
router.post('/login',login)

module.exports = router;
