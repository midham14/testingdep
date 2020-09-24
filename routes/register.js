const router = require('express').Router()
const session = require('express-session')
const RegisterController = require('../controllers/register-controller')

router.get('/', RegisterController.registerForm)
router.post('/', RegisterController.register)

module.exports = router