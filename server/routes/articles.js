var express = require('express');
var router = express.Router();
var { createArticle, deleteArticle, updateArticle, getAllArticle, getMyArticle, getOneArticle } = require('../controllers/articles')
var authentication = require('../middlewares/authentication')
/* GET users listing. */
router.get('/', getAllArticle)
router.get('/user', authentication, getMyArticle)
router.get('/:id', getOneArticle)

router.post('/', authentication, createArticle)
router.delete('/:id', authentication, deleteArticle)
router.put('/:id', authentication, updateArticle)

// router.post('/register',register)
// router.post('/login',login)

module.exports = router;
