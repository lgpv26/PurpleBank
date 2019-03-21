const passport = require('passport')
const _ = require('lodash')

const AccountUser = require('../models/user.model')

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
        else res.send(doc)
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
            else return res.status(200).json({status: true, user: _.pick(user, ['fullName', 'email', 'cpf', 'phone'])})
        })
}



