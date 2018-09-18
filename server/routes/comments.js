var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var { createComment, deleteComment } = require('../controllers/comments')

/* GET users listing. */
router.post('/:articleId',authentication,createComment)
router.delete('/:articleId/:commentId', authentication,deleteComment)


module.exports = router;
