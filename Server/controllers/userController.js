const User = require('../models/user');
const UserToken = require('../models/userToken');
const axios = require("axios");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthService = require('../services/authService');
const authService = require('../services/authService');

userController = {};

userController.signup =  async  (req, res) => {
    const {username, email} = req.body;
    const user = new User({
        username: username,
        email: email,
        neuroneauth: true
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "User "+user.username+" was registered successfully!" });
    });
};

userController.gmSignUp = async (req, res) => {
     //hash password
     const salt = await bcrypt.genSalt(10);
     const hashpassword = await bcrypt.hash(req.body.password, salt);
     //create user
     const user = new User({
         email: req.body.email,
         username: req.body.username,
         password: hashpassword,
         neuroneauth: false
     })
     //save user in db
     user.save((err, user) => {
         if(err){
             return res.status(404).json({
                 ok: false,
                 err
             });
         }
         res.status(200).json({
             user
         });
     })
}

userController.signin = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(!user){
        if(err){
            res.status(500).send({ message: "User doesn't exist!" });
            return;
        }
    }
    if(user.neuroneauth){
        await AuthService.authSignIn(req.body, (err, data)=> {
            if(err){
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).json({
                ok: true,
                data: data
            });
        })
    }
    else{
        await AuthService.signIn(req.body, (err, data) => {
            if(err){
                return res.status(500).send({ message: err });
            }
            let response = {
                username: data.user.username,
                email: data.user.email,
                _id: data.user._id,
                accessToken: data.accessToken
            };
            res.status(200).json({ok: true,data: response});
        })
    }
}

module.exports = userController;