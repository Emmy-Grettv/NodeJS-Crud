const jwt = require('jsonwebtoken')
const secret = process.env.secret;

let authenticate = (req, res, next) => {
   try {
      let token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, secret, (err, data) => {
         if (err) res.sendStatus(403)
         req.user = data
         next()
      })
   } catch (error) {
      if(error.name == "TokenExpiredError"){
         res.status(401).json({
            message: "Token expired!"
         })
      }else{
         res.json({
            message: "Authentication failed!",
            // error: error.message
         })
      }
   }
}

module.exports = authenticate