const router = require('express').Router()

const jwtHelper = require('../config/jwt-helper')
const parser = require('../config/cloudinary-config')

const accountUserController = require('../controllers/account-user.controller')
const contactController = require('../controllers/contact.controller')
const transactionController = require('../controllers/transaction.controller')

//rotas relacionadas ao usuário
router.post('/register', accountUserController.register)
router.post('/auth', accountUserController.authenticate)
router.get('/userAccount', jwtHelper.tokenVerification, accountUserController.userAccount)
router.post('/addProfileImage', parser.single('img'), accountUserController.addProfileImage)
router.put('/removeProfileImage/:document', accountUserController.removeProfileImage)

//rotas relacionadas aos contatos do usuário
router.post('/addContact', contactController.addContact)
router.get('/getContacts/:userDocument', contactController.getContacts)
router.delete('/removeContact/:userDocument/:id', contactController.removeContact)

//rotas de transação
router.post('/deposit', transactionController.deposit)
router.post('/transfer', transactionController.transfer)
router.get('/transactionsHistory/:limit/:document/:agency/:account/:accountDigit', transactionController.transactionsHistory)

//rotas relacionadas a conta bancaria do usuário
router.post('/createBankAccount', accountUserController.createBankAccount)
router.get('/bankAccount', accountUserController.bankAccount)
router.get('/findByBankAccountNumber', accountUserController.findByBankAccountNumber)
 
module.exports = router