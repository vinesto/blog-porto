const Article = require('../models/articles')
const User = require('../models/users')

const createArticle = function (req, res) {
    let { title, description, content, imageUrl } = req.body
    Article.create({
        title: title,
        description: description,
        content: content,
        imageUrl: imageUrl,
        authorId: req.user.id
    })
        .then(function (newArticle) {
            res.status(200).json({
                message: "create article success",
                data: newArticle
            })
        })
        .catch(function (err) {
            res.status(400).json({
                message: "create article failed",
                erro: err.message
            })

        })
}

const deleteArticle = function (req, res) {
    Article.findOneAndRemove({
        authorId: req.user.id,
        _id: req.params.id
    })
        .then(function (article) {
            if (article) {
                res.status(200).json({ message: "delete article success" })
            } else {
                res.status(201).json({ message: "You are not authorized to access this page" })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "delete article success",
                error: err.message
            })
        })
}

const getAllArticle = function (req, res) {
    Article.find({})
        .then(function (articles) {
            if (articles) {
                res.status(200).json({
                    message: "Articles found",
                    data: articles
                })
            } else {
                res.status(201).json({
                    message: "Articles not found"
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "error get articles",
                error: err.message
            })
        })
}

const getOneArticle = function (req, res) {

    Article.findOne({ _id: req.params.id })
        .then(function (article) {
            if (article) {
                res.status(200).json({
                    message: "Article found",
                    data: article
                })
            } else {
                res.status(201).json({
                    message: "You are not authorized to access this page"
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "error get articles",
                error: err.message
            })
        })
}

const getMyArticle = function (req, res) {

    Article.find({ authorId: req.user.id })
        .then(function (articles) {
            if (articles) {
                res.status(200).json({
                    message: "Articles found",
                    data: articles
                })
            } else {
                res.status(201).json({
                    message: "Articles not found"
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message: "error get articles",
                error: err.message
            })
        })
}

const updateArticle = function () {
    let { title, description, content } = req.body
    let objForUpdate = {}

    if (title) objForUpdate.title = title
    if (description) objForUpdate.description = description
    if (content) objForUpdate.content = content

    var setObj = { $set: objForUpdate }

    Article.findOneAndUpdate({
        _id: req.params.id,
        authorId: req.user.id
    }, setObj)
        .then(function (article) {
            if (article) {
                res.status(200).json({
                    message: "Update success",
                    data: article
                })
            } else {
                res.status(201).json({
                    message: "You are not authorized to access this page"
                })
            }
        })
        .catch(function (err) {
            res.status(400).json({
                message:"Update failed",
                error:err.message
            })
        })

}

module.exports = { createArticle, deleteArticle, getAllArticle, getMyArticle, getOneArticle, updateArticle }