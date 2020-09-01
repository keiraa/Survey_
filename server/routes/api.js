const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const router = express.Router()

const mongoose = require('mongoose')
const { json } = require('body-parser')
const db = "mongodb+srv://ravi:13reasonswhy@cluster0.28sio.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(db, err=>{
    if(err){
        console.log('Error: ' + err)
    }
    else{
        console.log('Connected to Mongo')
    }
})

function verifyToken(req,res,next){
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token == 'null')
    {
        return res.status(401).send('Unauthorized Request')
    }
    let payload = jwt.verify(token,'hola')
    if(!payload)
    {
        return res.status(401).send('Unauthorized Request')
    }
    req.userId = payload.subject
    next()
}


router.get('/',(req, res)=>{
    res.send('How You Doin?, From API')
})

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((err,regUser)=>{
        if(err){
            console.log(error)
        } else{
            let payload = { subject:regUser._id }
            let token = jwt.sign(payload,'hola')
            res.status(200).send({token})
        }
    })
})

router.get('/mainPage',verifyToken,(req, res)=>{
    res.send('Authorized')
})

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email: userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid Email')
            }
            else if(user.password != userData.password){
                res.status(401).send('Invalid Password')
            }
            else{
                let payload = { subject:userData._id }
                let token = jwt.sign(payload,'hola')
                res.status(200).send({token})
            }
        }
    })
})

module.exports = router