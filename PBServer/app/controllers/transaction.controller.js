const _ = require('lodash')

const Transaction = require('../models/transaction.model')

module.exports.deposit = (req, res, next) => {
    const transaction = new Transaction()

    //sender
    const sender = {
        name: req.body.bankAccount.legal_name,
        document: req.body.bankAccount.document_number,
        bank_code: req.body.bankAccount.bank_code,
        account: req.body.bankAccount.account,
        account_digit: req.body.bankAccount.account_digit,
        agency: req.body.bankAccount.agency,
    }

    transaction.sender.push(sender)
    transaction.status = 'pago'
    transaction.amount = req.body.transaction.amount
    transaction.description = 'DEP/Dinheiro PurpleConta'
    transaction.creation_date = Date.now()
    transaction.receiver.push(sender)

    transaction.save((error, document) => {
        if(error) return next(error)
        else {
            //if(error) return res.status(422).json({status: false, message: 'Algo deu errado.'})
            if(!document) return res.status(404).json({status: false, message: 'Não foi possível depositar.'})
            else {
                transaction.updateBalanceDeposit(document)
                return res.status(200).json({status: true, transaction: _.pick(document, [
                    'sender',
                    'status',
                    'amount',
                    'creation_date',
                    'description',
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
    const hasDescription = req.body.transaction.description ? req.body.transaction.description : 'De ' + req.body.transaction.sender.legal_name
    transaction.description = 'TED/' + hasDescription
    transaction.creation_date = Date.now()
    transaction.receiver.push(receiver)

    transaction.save((error, document) => {
        if(error) return next(error)
        if(!document) return res.status(404).json({status: false, message: 'Não possível transferir.'})
        if(req.body.transaction.sender.balance < transaction.amount) return res.status(422).json({status: false, message: 'Saldo insuficiente.'})
        if(req.body.transaction.sender.account == req.body.transaction.receiver.account) return res.status(422).json({status: false, message: 'Você não pode fazer uma transferência para você mesmo. Utilize a area de depósito para isso.'})
        else {
            transaction.updateBalanceTransfer(document)
            return res.status(200).json({status: true, transaction: _.pick(document, [
                'sender',
                'status',
                'amount',
                'creation_date',
                'description',
                'receiver'
            ])})
        }
    })
}

module.exports.transactionsHistory = (req, res, next) => {
    Transaction.find(
        {$or: 
            [
                {"sender.document": req.params.document},
                {$and: [
                    {"receiver.agency": req.params.agency},
                    {"receiver.account": req.params.account},
                    {"receiver.account_digit": req.params.accountDigit}
                ]}
            ]
        }, 
        null, 
        {limit: req.params.limit, sort: {creation_date: -1}}, 
        (err, transaction) => {
            if(err) return res.status(422).json({status: false, message: 'Não foi possível encontrar as transações.'})
            if(!transaction) return res.status(404).json({status: false, message: 'Essa conta ainda não possuí transações.'})
            else return res.status(200).json({status: true, transactions: _.concat(transaction)})
    })
}

