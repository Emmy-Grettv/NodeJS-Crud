const Joi = require('joi')
const validator = (schema) => (payload) => schema.validate(payload, {abortEarly:false})

const signupSchema = Joi.object({
   name: Joi.string().min(4).max(40).alphanum().required(),
   email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),
   age: Joi.number().required(),
   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()
})

module.exports = signupSchema;
// module.exports = validator(signupSchema);