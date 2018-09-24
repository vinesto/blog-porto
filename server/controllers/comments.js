const Comment = require('../models/comments')
const Article = require('../models/articles')

const createComment = function (req, res) {
    Comment.create({
        userId: req.user.id,
        comment: req.body.comment,
        userName: req.user.name
    })
        .then(function (comment) {
            Article.updateOne({
                _id: req.params.articleId
            }, {
                    $push: {
                        comment: comment._id
                    }
                })
                .then(function (article) {
                    if (article) {
                        res.status(200).json({
                            message: "add comment success",
                            data: article
                        })
                    } else {
                        res.status(201).json({
                            message: "article not found",
                        })
                    }
                })
                .catch(function (err) {
                    res.status(400).json({
                        message: "add comment failed",
                        error: err.message
                    })
                })
        })
        .catch(function (err) {
            res.status(500).json({
                message: "add comment error",
                error: err.message
            })
        })
}

const deleteComment = function (req, res) {
    Article.findOneAndUpdate({
        _id:req.params.articleId,
    },{
        $pull:{
            comment: req.params.commentId
        }
    })
    .then(function(article){
        if(article){
            // console.log('masuuk article');
            Comment.findOneAndRemove({
                _id:req.params.commentId,
                userId:req.user.id
            })
            .then(function(comment){
                if(comment){
                    res.status(200).json({
                        message:"delete comment success"
                    })
                }else{
                    res.status(201).json({
                        message:"you are not authorized to access this"
                    })
                }
            })
            .catch(function(err){
                res.status(400).json({
                    message:"delete comment failed",
                    error:err.message
                })
            })
        }
    })
    .catch(function(err){
        res.status(500).json({
            message:"error delete comment",
            error:err.message
        })
    })
}

module.exports = { createComment, deleteComment }
