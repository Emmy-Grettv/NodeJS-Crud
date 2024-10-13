const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
require('dotenv').config()
const validateSignup = require('../models/validator')
// const validateSchema = require('../models/validator')

const secret = process.env.secret
const refreshSecret = process.env.refreshSecret

const register = (req, res) => {
   bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
         res.json({
            error: err
         })
      }
      let user = new Users({
         name: req.body.name,
         email: req.body.email,
         age: req.body.age,
         password: hashedPass,
      })
      user.save()
         .then(user => {
            res.json({
               message: "User added successfully"
            })
         }).catch(error => {
            console.log(error.stack);
            res.json({
               message: "An error occured!"
            })
         })
   })
}

const validateSign = (req, res, next) => {
   const {error, value} = validateSignup.validate(req.body, { 
      abortEarly: false,
   });
   if(error){
      next(error);
   }
   next()
}

const login = async (req, res, next) => {
   let email = req.body.email;
   let password = req.body.password;

   const user = await Users.findOne({ email: email })
   if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
         if (err) {
            return res.json({
               error: err
            })
         }
         if (result) {
            let token = jwt.sign({ sub: user._id }, secret, { expiresIn: '10w' });
            let refreshToken = jwt.sign({ sub: user._id }, refreshSecret, { expiresIn: '38w' });
            return res.json({
               token,
               refreshToken
            })
         }
      })

   } else {
      return res.status(404).json({
         error: "User not found",
         user: user
      })
   }

}

const refreshToken = (req, res, next) => {
   const refreshToken = req.body.refreshToken
   jwt.verify(refreshToken, refreshSecret, function (err, decode) {
      if (err) {
         res.status(400).json({
            err
         })
      } else {
         let token = jwt.sign({ sub: user._id }, secret, { expiresIn: '38w' })
         let refreshToken = req.body.refreshToken
         res.status(200).json({
            message: "Token refreshed successfully!",
            token,
            refreshToken
         })
      }
   })
}

const authorize = async (req, res, next) => {

   let authHeader = req.headers['authorization']
   if (authHeader) {
      let token = authHeader.split(' ')[1]
      if (token) {
         jwt.verify(token, process.env.secret, (err, decodeToken) => {
            if(err) console.log(err.message);
            req.user = decodeToken
            next()
         })
      }
      next()
   }
   next()

}

const tokenVerified = function(req, res){
   console.log(req.user);
   if(req.user && req.user !== ""){
      return res.send("user dashboard")
   
      }else{
   res.sendStatus(401)
      }
}

module.exports = {
   register, login, refreshToken, authorize,tokenVerified, validateSign                        
}