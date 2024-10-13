const { response } = require('express');
const User = require('../models/user');
// const hashPass = require('../controllers/authControllers')

//showing the list of users
const index = (req, res, next) => {
   User.find()
   .then(response => {
    return  res.json({
         response
      })
   }).catch(error => {
    return  res.json({
         message: 'An error occured!'
      })
   })
}

//showing single user
const show = (req, res) => {
   let userID = req.params.id;
   
   User.findById(userID)
   .then(response => {
   return   res.json({
         response
      })
   }).catch(error => {
    return  res.json({
         message: 'An error occured!'
      })
   })
}

//storing data
const store = (req, res, next) =>{
   let user = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
      // image: req.body.image,
   })
   // if(req.file){
   //    user.image = req.file.path
   // }
   user.save()
   .then(response => {
     return res.json({
         message:'User added successfully!',
      })
   }).catch(error => {
     return  res.json({
         message:'Error occured!'
      })
   })
}

//updating data
const update = (req, res, next) => {
   let userID = req.body.userID
   let updateData = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
      // image: req.body.image,
   }
   User.findByIdAndUpdate(userID, {$set: updateData})
   .then(response => {
     return  res.json({
         message: 'User updated successfully!'
      })
   }).catch(error => {
      return res.json({
         message: 'An error occured!'
      })
   })
}

//Delete user
const eliminate = (req, res, next) => {
let userID = req.body.userID
User.findByIdAndRemove(userID)
.then(() => {
   return res.json({
      message: 'User deleted successfully!'
   })
}).catch(error => {
   return res.json({
      message: 'An error occured!'
   })
})
}


module.exports = {
   index, show, update, store, eliminate
}