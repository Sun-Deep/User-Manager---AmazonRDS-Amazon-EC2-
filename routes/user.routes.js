var express = require('express')
var userCtrl = require('../controllers/user.controller')

const router = express.Router()


router.route('/')
    .get(userCtrl.list)
    .post(userCtrl.register)

router.route('/register')
    .get(userCtrl.registerForm)
    

router.route('/:id')    
    .get(userCtrl.updateForm)
    .post(userCtrl.update)

router.route('/remove/:id')
    .get(userCtrl.remove)





module.exports = router