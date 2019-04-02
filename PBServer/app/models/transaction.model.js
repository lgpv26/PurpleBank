const mongoose = require('mongoose')

const BankAccount = require('./bank-account.model')

const senderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Nome do enviador é obrigatório.'
    }, 
    document: {
        type: String,
        required: 'Documento do enviador é obrigatório.'
    },
    bank_code: {
        type: Number,
        required: 'Código do banco é obrigatório.'
    },
    account: {
        type: Number,
        required: 'Conta do enviador é obrigatório.',
        maxlength: [13, 'Número da conta não pode conter mais de 13 caracteres.']
    },
    account_digit: {
        type: String,
        required: 'Dígito da conta do enviador é obrigátorio.',
        maxlenght: [2, 'Dígito da conta do enviador não pode ter mais que 2 caracteres.']
    },
    agency: {
        type: Number,
        required: 'Agência do enviador é obrigatório.',
        maxlength: [5, 'Agência do enviador não pode ter mais que 5 caracteres.']
    },
    agency_digit: {
        type: String,
        maxlength: [1, 'Dígito da agência do enviador pode ter apenas 1 caracter.']
    }
})

const receiverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Nome do recebedor é obrigatório.'
    }, 
    document: {
        type: String
    },
    bank_code: {
        type: Number,
        required: 'Código do banco é obrigatório.'
    },
    account: {
        type: Number,
        required: 'Conta do recebedor é obrigatório.',
        maxlength: [13, 'Número da conta não pode conter mais de 13 caracteres.']
    },
    account_digit: {
        type: String,
        required: 'Dígito da conta do recebedor é obrigátorio.',
        maxlenght: [2, 'Dígito da conta do recebedor não pode ter mais que 2 caracteres.']
    },
    agency: {
        type: Number,
        required: 'Agência do recebedor é obrigatório.',
        maxlength: [5, 'Agência do recebedor não pode ter mais que 5 caracteres.']
    },
    agency_digit: {
        type: String,
        maxlength: [1, 'Dígito da agência do recebedor pode ter apenas 1 caracter.']
    }
})

const transactionSchema = new mongoose.Schema({
    sender: [senderSchema],
    status: {
        type: String,
        required: 'O status da transação é obrigatório.'
    },
    description: {
        type: String,
        maxlength: [45, 'A descrição deve ter menos de 45 caracteres.']
    },
    amount: {
        type: Number,
        required: 'A quantidade deve ser informada.'
    },
    creation_date: {
        type: Date,
        required: 'A data de criação da transação deve é obrigatório.'
    },
    receiver: [receiverSchema]
})

transactionSchema.path('status').validate((status) => {
    if(status == 'cancelado' || status == 'pendente' || status == 'pago') return true
    else return false
}, 'O status da transação deve ser "cancelado", "pendente" ou "pago".')

transactionSchema.path('amount').validate((amount) => {
    if(amount >= 1000 && amount <= 5000000) return true
    else return false
}, 'O valor máximo ou mínimo da transação foi excedido.')

transactionSchema.methods.updateBalanceDeposit = function(deposit) {
    BankAccount.findOne({document_number: deposit.receiver[0].document})
        .then(res => {
            BankAccount.updateOne(
                {document_number: deposit.receiver[0].document},
                {$set: {balance: res.balance += deposit.amount}},
                (err, doc) => {
                    if(err) return err
                    this.status = 'pago'
                })
        })
}

transactionSchema.methods.updateBalanceTransfer = function(transfer) {
    //account receiver
    BankAccount.findOne({
        agency: transfer.receiver[0].agency,
        account: transfer.receiver[0].account,
        account_digit: transfer.receiver[0].account_digit}, 
        (err, res) => {
            if(err) return err
            if(!res) return 
            else BankAccount.updateOne({
                agency: transfer.receiver[0].agency,
                account: transfer.receiver[0].account,
                account_digit: transfer.receiver[0].account_digit}, {
                    $set: {balance: res.balance += transfer.amount}
                },
                (err, doc) => {
                    if(err) return err
                    this.status = 'pago'
                })
        })

    //account sender
    BankAccount.findOne({
        document_number: transfer.sender[0].document},
        (err, res) => {
            if(err) return err
            if(!res) return 
            else BankAccount.updateOne({
                document_number: transfer.sender[0].document}, {
                    $set: {balance: res.balance -= transfer.amount}
                },
                (err, doc) => {
                    if(err) return err
                    this.status = 'pago'
                })
        })
}

const transaction = mongoose.model('Transaction', transactionSchema)
module.exports = transaction