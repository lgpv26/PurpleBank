const _ = require('lodash')

const UserAccount = require('../models/user.model')

module.exports.addContact = (req, res, next) => {
    const contact = {
        nickname: req.body.contact.nickname,
        agency: req.body.contact.agency,
        account: req.body.contact.account,
        account_digit: req.body.contact.account_digit
    }
    UserAccount.findOneAndUpdate({cpf: req.body.userDocument}, {$push: {contacts: contact}}, (err, user) => {
        if(err) return next(err)
        if(!user) return res.status(404).json({status: false, message: 'Nenhum usuário encontrado.'})
        else return res.status(200).json({status: true, contacts: _.concat(user.contacts)})
    })
}

module.exports.getContacts = (req, res, next) => {
    UserAccount.findOne({cpf: req.params.userDocument}, (err, user) => {
        if(err) return next(err)
        if(!user) return res.status(404).json({status: false, message: 'Nenhum usuário encontrado.'})
        else return res.status(200).json({status: true, contacts: _.concat(user.contacts)})
    })
}

module.exports.removeContact = (req, res, next) => {
    UserAccount.findOneAndUpdate({cpf: req.params.userDocument}, {
        $pull: { "contacts": {_id: req.params.id} }
    }, (err, user) => {
        if(err) return next(err)
        if(!user) return res.status(404).json({status: false, message: 'Não foi possível encontrar o usuário.'})
    }).then(user => res.status(200).json({status: true, user: _.pick(user, ['fullName', 'email', 'cpf', 'phone', 'img', 'contacts'])}))
}