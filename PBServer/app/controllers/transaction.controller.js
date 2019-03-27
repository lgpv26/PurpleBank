const _ = require('lodash')

const Transaction = require('../models/transaction.model')

module.exports.deposit = (req, res, next) => {
    const transaction = new Transaction()

    //sender
    const sender = {
        name: req.body.userAccount.fullName,
        document: req.body.userAccount.cpf,
        bank_code: req.body.bankAccount.bank_code,
        account: req.body.bankAccount.account,
        account_digit: req.body.bankAccount.account_digit,
        agency: req.body.bankAccount.agency,
    }

    transaction.sender.push(sender)
    transaction.status = 'pago'
    transaction.amount = req.body.transaction.amount
    transaction.creation_date = Date.now()
    transaction.receiver.push(sender)

    transaction.save((error, document) => {
        if(error) return next(error)
        else {
            //if(error) return res.status(422).json({status: false, message: 'Algo deu errado.'})
            if(!document) return res.status(404).json({status: false, message: 'Não foi possível depositar.'})
            else {
                transaction.updateBalanceDeposit(document)
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

module.exports.transfer = (req, res, next) => {
    const transaction = new Transaction()

    const sender = {
        name: req.body.transaction.sender.legal_name,
        document: req.body.transaction.sender.document_number,
        bank_code: req.body.transaction.sender.bank_code,
        account: req.body.transaction.sender.account,
        account_digit: req.body.transaction.sender.account_digit,
        agency: req.body.transaction.sender.agency
    }

    const receiver = {
        name: req.body.transaction.receiver.legal_name,
        bank_code: req.body.transaction.receiver.bank_code,
        account: req.body.transaction.receiver.account,
        account_digit: req.body.transaction.receiver.account_digit,
        agency: req.body.transaction.receiver.agency
    }

    transaction.sender.push(sender)
    transaction.status = 'pago'
    transaction.amount = req.body.transaction.amount
    transaction.description = req.body.transaction.description
    transaction.creation_date = Date.now()
    transaction.receiver.push(receiver)

    transaction.save((error, document) => {
        if(error) return next(error)
        if(!document) return res.status(404).json({status: false, message: 'Não possível transferir.'})
        if(req.body.transaction.sender.balance < transaction.amount) return res.status(422).json({status: false, message: 'Saldo insuficiente.'})
        if(req.body.transaction.sender.account == req.body.transaction.receiver.account) return res.status(422).json({status: false, message: 'Você não pode fazer uma transferência para você mesmo. Utilize a area de depósito para isso.'})
        else {
            transaction.updateBalanceTransfer(document)
            return res.status(200).json({status: true, transaction: _.pick(transaction, [
                'sender',
                'status',
                'amount',
                'creation_date',
                'receiver'
            ])})
        }
    })
}

