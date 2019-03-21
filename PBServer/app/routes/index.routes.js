const router = require('express').Router()

const jwtHelper = require('../config/jwt-helper')
const accountUserController = require('../controllers/account-user.controller')

router.post('/register', accountUserController.register)
router.post('/auth', accountUserController.authenticate)
router.get('/userAccount', jwtHelper.tokenVerification, accountUserController.userAccount)

module.exports = router