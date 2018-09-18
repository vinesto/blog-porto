const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const mongoose = require('mongoose')
const User = require('../models/users')
const Article = require('../models/articles')
const Comment = require('../models/comments')
const url = 'http://localhost:3000'
const jwt = require('jsonwebtoken')
require('dotenv').config()
let authorId = ""
let articleId = ""
let token = ""
let commentId = ""

chai.use(chaiHttp)

describe('Comment', function () {
    this.timeout(5000000)

    before(function (done) {
        mongoose.connect(process.env.MONGO_TESTING_URI, { useNewUrlParser: true }).then(function () {
            User.create({
                name: 'tester',
                email: 'tester@mail.com',
                password: '123456'
            })
                .then(function (user) {

                    User.findOne({ email: user.email })
                        .then(function (dataUser) {
                            authorId = dataUser._id

                            token = jwt.sign({
                                id: dataUser._id,
                                name: dataUser.name,
                                email: dataUser.email
                            }, process.env.JWT_KEY)

                            Article.create({
                                authorId: dataUser._id,
                                title:"comment title",
                                description:"comment description",
                                content:"comment content",
                                imageUrl:"http://www.eschoolnews.com/files/2014/08/online_testing.3.jpg"
                            })
                            .then(function(article){
                                // console.log('---ar', article);
                                articleId = article._id
                                console.log(articleId,'jiajijaijaija');
                            })
                            done()
                        })
                        
                })
                .catch(function (err) {
                    console.log(err);
                    done()
                })
        })
    })

    after(function (done) {
        // console.log('masuuk after');
        User.remove({})
            .then(function () {
                Article.remove({})
                .then(function(){
                    Comment.remove({})
                        .then(function () {
                            done()
                        })
                })
            })
    })

    it('POST /comments/:articleId should be create a new object comment',function(done){
        console.log('ddddddd', articleId);
        
        chai.request(url)
        .post(`/comments/${articleId}`)
        .send({
            comment:"test comment"
        })
        .set('token', token)
        .end(function(err,res){
            console.log(res.body,'iiiiiii');
            // commentId = res.body.data._id
            done()
        })
    })

    // it('DELETE /comments/:articleId/:commentId should be delete a comment', function(done){

    // })
})