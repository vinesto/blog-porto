const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const mongoose = require('mongoose')
const User = require('../models/users')
const url = 'http://localhost:3000'
require('dotenv').config()


chai.use(chaiHttp)

describe('User', function () {
    this.timeout(5000000)
    
    beforeEach(function (done) {
        mongoose.connect(process.env.MONGO_TESTING_URI, { useNewUrlParser: true }).then(function(){
            User.create({
                name: 'tester',
                email: 'tester@mail.com',
                password: '123456'
            })
                .then(function () {
                    done()
                })
                .catch(function () {
                    done()
                })
        })
    })

    afterEach(function (done) {
        User.remove({})
            .then(function () {
                done()
            })
            .catch(function () {
                done()
            })
    })



    it('POST /users/register should return new obj user', function (done) {
        chai.request(url)
            .post('/users/register')
            .send({
                name: 'test',
                email: 'test@mail.com',
                password: '123456'
            })
            .end(function (err, res) {
                console.log('testing response register')

                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body.data).to.be.a('object')
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email')
                expect(res.body.data).to.have.property('password')
                expect(res.body.data.name).to.equal('test')
                expect(res.body.data.email).to.equal('test@mail.com')
                expect(res.body.data.password).to.not.equal('123456')
                done()
            })
    })

    it('POST /users/login should return new obj token', function (done) {
        chai.request('http://localhost:3000')
            .post('/users/login')
            .send({
                email: 'tester@mail.com',
                password: '123456'
            })
            .end(function (err, res) {

                console.log('testing response login')

                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body.message).to.equal('Login success')
                expect(res.body.token).to.not.equal('')
                done()
            })
    })
})