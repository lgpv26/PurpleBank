const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cpfValidator = require('../validators/cpf.validator')
const phoneValidator = require('../validators/phone-validator')

const bankAccount = require('../models/bank-account.model')

const accountUserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Seu nome não pode estar vazio.',
    },
    email: {
        type: String,
        required: 'O endereço de email não pode estar vazio.',
        unique: true
    },
    cpf: {
        type: String,
        required: 'O CPF tem que ser preenchido.',
        unique: true
    },
    phone: {
        type: String,
        required: 'Você precisá preencher seu celular.'
    },
    password: {
        type: String,
        required: 'Você precisá de uma senha.',
        minlength: [6, 'A senha precisá ter mais de 6 dígitos.']
    },
    terms: {
        type: Boolean,
        required: 'É necessário concordar com o contrato.'
    },
    img: {
        type: String
    },
    saltSecret: String
})

accountUserSchema.path('email').validate((email) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email)
}, 'Endereço de email inválido.')

accountUserSchema.path('cpf').validate((cpf) => {
    return cpfValidator(cpf)
}, 'CPF inválido.')

accountUserSchema.path('phone').validate((phoneNumber) => {
    return phoneValidator(phoneNumber)
}, 'Número de celular inválido.')

accountUserSchema.pre('save', function(next) {
    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash
            this.saltSecret = salt
            next()
        })
    })
})

accountUserSchema.methods.generateJWT = function() {
    return jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP
    })
}

accountUserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

accountUserSchema.methods.createAccountNumber = function() {
    return new Promise((resolve, reject) => {
        bankAccount.findOne({}).sort({account: -1}).exec((err, res) => {
            if(!res) {
                bankAccount.collection.insert({account: 10000})
                    .then(res => resolve(res))
                return
            }
            resolve(res.account + 1)
        })
    })
    
}

const AccountUser = mongoose.model('AccountUser', accountUserSchema)
module.exports = AccountUser