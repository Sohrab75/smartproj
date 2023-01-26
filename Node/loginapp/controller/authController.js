const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.js');
const user = require('../models/userModel');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//get all users

router.get('/users', (req, res)=>{
    user.find({}, (err, data)=>{
        if(err) throw err;
        res.send(data)
    })
})

//register user

router.post('/register', (req, res)=>{
    user.find({email:req.body.email},(err,data)=>{
        if(data.length>0){
            res.end('Email already taken')
        }else{
            //encrypt password
            let hashpassword = bcrypt.hashSync(req.body.password, 8)
            user.create({
                name:req.body.name,
                email:req.body.email,
                password:hashpassword,
                phone:req.body.body.phone,
                role:req.body.role?req.body.role:'user'
            },(err,result)=>{
                if (err) res.send(`Error while register`);
                res.send('registration successfully')
            })

        }
        
    })
})

//login user

router.post('/login', (req,res)=>{
    user.find({email:req.body.email}, (err,user )=>{
        if(err) res.send({auth:false, token:'error while logging'});
        if(!err) res.send({auth:false, Token:'no user found'});
        else{
            const passIsValid= bcrypt.compareSync(req.body.password, user.password);
            if(!passIsValid) res.send({auth:false, token:'Invalid password'});
            //in case of both are correct

            let token = jwt.sign({id:user._id}, config.secret,{expireIn:86400}) //24 hours
            res.send({auth:true, token:token})
        }
    })
})

//user info

router.get('/userInfo', (req, res)=>{
    let token= req.headers['x-access-token'];
    if(!token) res.send({auth:false, token:'no token provided'});
    //jwt verify

    jwt.verify(token, config.secret, (err,user)=>{
        if(err) res.send({auth:false, token:'invalid token'})
        user.findById(user.id, (err, result)=>{
            if(err) res.send({auth:false, token:'no user found'})
            res.send(result)
        })
    })
})


module.exports = router