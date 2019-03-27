const passport = require('passport')
const _ = require('lodash')

const AccountUser = require('../models/user.model')
const BankAccount = require('../models/bank-account.model')


module.exports.register = (req, res, next) => {
    const accountUser = new AccountUser()
    accountUser.fullName = req.body.fullName
    accountUser.email = req.body.email
    accountUser.cpf = req.body.cpf
    accountUser.phone = req.body.phone
    accountUser.password = req.body.password
    accountUser.terms = req.body.terms
    
    accountUser.save((err, doc) => {
        if(err) {
            if(err.code == 11000) res.status(422).send(['CPF e/ou endereço de email já foram utilizados.'])
            else return next(err)
        }
        else {
            return res.send(doc)
        }
    })
}

module.exports.createBankAccount = (req, res, next) => {
    const accountUser = new AccountUser()
    const bankAccount = new BankAccount()
    accountUser.createAccountNumber()
        .then(accountNumber => {

            bankAccount.bank_code = 128
            bankAccount.agency = 2347
            bankAccount.agency_digit = 6
            bankAccount.account_digit = Math.floor(Math.random() * 99)
            bankAccount.balance = 0
            bankAccount.account = accountNumber
            bankAccount.account_type = 'conta_corrente'
            bankAccount.account_status = 'opened'
            bankAccount.document_number = req.body.cpf
            bankAccount.legal_name = req.body.fullName
            bankAccount.creation_date = Date.now()
            
            bankAccount.save((errorBank, document) => {
                if(errorBank) {
                    if(errorBank.code == 11000) res.status(422).send(['Conta já existente.'])
                    else return next(errorBank)
                } else return res.send(document)
            })
        })
        .catch(err => {
            console.log(err)
            return next(err)
        })
}

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.status(404).json(err)
        if(user) return res.status(200).json({"token": user.generateJWT()})
        else return res.status(401).json(info)
    })(req, res)
}

module.exports.userAccount = (req, res, next) => {
    AccountUser.findOne({ _id: req._id },
        (err, user) => {
            if(!user) return res.status(404).json({status: false, message: 'Conta de usuário não encontrada.'})
            else return res.status(200).json({status: true, user: _.pick(user, ['fullName', 'email', 'cpf', 'phone', 'img'])})
        })
}

module.exports.bankAccount = (req, res, next) => {
    let user = JSON.parse(req.headers.useraccount)
    BankAccount.findOne({ document_number: user.cpf },
        (err, account) => {
            if(err) return res.status(422).json({status: false, message: 'Algo deu errado.'})
            if(!account) return res.status(404).json({status: false, message: 'Não existe nenhum conta bancária com esse CPF.'})
            else return res.status(200).json({status: true, bank_account: _.pick(account, 
                [
                    'bank_code', 
                    'agency', 
                    'agency_digit', 
                    'balance',
                    'account', 
                    'account_digit', 
                    'account_type', 
                    'account_status', 
                    'document_number', 
                    'legal_name',
                    'creation_date'
                ]
            )})
        })
}

module.exports.findByBankAccountNumber = (req, res, next) => {
    BankAccount.findOne({agency: req.query.agency, account: req.query.account, account_digit: req.query.accountDigit},
        (err, account) => {
            if(err) return res.status(422).json({status: false, message: 'Algo deu erraso.'})
            if(!account) return res.status(404).json({status: false, message: 'Essa conta ainda não existe. Revise as informações.'})
            else return res.status(200).json({status: true, bank_account: _.pick(account,
                [
                    'bank_code',
                    'agency',
                    'agency',
                    'account',
                    'account_digit',
                    'account_type',
                    'legal_name'
                ]
            )})
        })

}



