const _ = require('lodash')

const Transaction = require('../models/transaction.model')

module.exports.deposit = (req, res, next) => {
    const transaction = new Transaction()

    //sender
    const sender = {
        name: req.body.userAccount.fullName,
        document: req.body.userAccount.cpf,
        account: req.body.bankAccount.account,
        account_digit: req.body.bankAccount.account_digit,
        agency: req.body.bankAccount.agency,
    }

    transaction.sender.push(sender)
    transaction.status = 'pendente'
    transaction.amount = req.body.transaction.amount
    transaction.creation_date = Date.now()
    transaction.receiver.push(sender)

    transaction.save((error, document) => {
        if(error) return next(error)
        else {
            //if(error) return res.status(422).json({status: false, message: 'Algo deu errado.'})
            if(!document) return res.status(404).json({status: false, message: 'Não foi possível depositar.'})
            else {
                transaction.updateBalance(document)
                transaction.status = 'pago'
                return res.status(200).json({status: true, transaction: _.pick(transaction, [
                    'sender',
                    'status',
                    'amount',
                    'creation_date',
                    'receiver'
                ])})
            //return res.send(document)
            }
        }
    })
}

