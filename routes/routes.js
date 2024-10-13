const express = require('express');
const router = express.Router()

const userControl = require('../controllers/userControl')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/',authenticate, userControl.index)
router.get('/show/:id', userControl.show)
router.post('/store', userControl.store)
router.post('/update', userControl.update)
router.post('/delete', userControl.eliminate)


module.exports = router