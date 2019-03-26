const mongoose = require('mongoose')

const BankAccount = require('./bank-account.model')

const senderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Nome do enviador é obrigatório.'
    }, 
    document: {
        type: Number,
        required: 'Documento do enviador é obrigatório.'
    },
    account: {
        type: Number,
        required: 'Conta do enviador é obrigatório.'
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
        type: Number,
        required: 'Documento do recebedor é obrigatório.'
    },
    account: {
        type: Number,
        required: 'Conta do recebedor é obrigatório.'
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

transactionSchema.methods.updateBalance = function(account) {
    BankAccount.findOne({document_number: account.receiver[0].document})
        .then(res => {
            BankAccount.updateOne(
                {document_number: account.receiver[0].document},
                {$set: {balance: res.balance += account.amount}},
                (err, doc) => {
                    if(err) return err
                    this.status = 'pago'
                })
        })
}

const transaction = mongoose.model('Transaction', transactionSchema)
module.exports = transaction