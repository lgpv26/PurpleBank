const router = require('express').Router()

const jwtHelper = require('../config/jwt-helper')
const accountUserController = require('../controllers/account-user.controller')
const transactionController = require('../controllers/transaction.controller')

router.post('/register', accountUserController.register)
router.post('/createBankAccount', accountUserController.createBankAccount)
router.post('/auth', accountUserController.authenticate)

router.post('/deposit', transactionController.deposit)
router.post('/transfer', transactionController.transfer)

router.get('/userAccount', jwtHelper.tokenVerification, accountUserController.userAccount)
router.get('/bankAccount', accountUserController.bankAccount)
router.get('/findByBankAccountNumber', accountUserController.findByBankAccountNumber)
 
module.exports = router