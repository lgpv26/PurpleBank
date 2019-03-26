const mongoose = require('mongoose')

const bankAccountSchema = new mongoose.Schema({
    bank_code: {
        type: Number,
        required: 'Código do banco é obrigatório.',
        minlength: [3, 'Código do banco deve ter 3 caracteres.'],
        maxlength: [3, 'Código do banco deve ter 3 caracteres.']
    },
    agency: {
        type: Number,
        required: 'Agência é obrigatório.',
        maxlength: [5, 'Agência não pode ter mais que 5 caracteres.']
    },
    agency_digit: {
        type: String,
        maxlength: [1, 'Dígito da agência pode ter apenas 1 caracter.']
    },
    balance: {
        type: Number,
        required: 'Saldo é obrigátorio.'
    },
    account: {
        type: Number,
        unique: true,
        required: 'Número da conta bancária é obrigatório.',
        maxlength: [13, 'Número da conta não pode conter mais de 13 caracteres.']
    },
    account_digit: {
        type: String,
        required: 'Dígito da conta é obrigátorio.',
        maxlenght: [2, 'Dígito da conta não pode ter mais que 2 caracteres.']
    },
    account_type: {
        type: String
    },
    account_status: {
        type: String,
        required: 'Status da conta é obrigatório.'
    },
    document_number: {
        type: String,
        required: 'O Documento é obrigatório',
        unique: true
    },
    legal_name: {
        type: String,
        required: 'Nome do titular é obrigatório.'
    },
    creation_date: {
        type: Date,
        required: 'Data de criação é obrigatório.'
    }
})

bankAccountSchema.path('account_type').validate((accountType) => {
    if(accountType == 'conta_corrente' || accountType == 'conta_poupanca') return true
    else return false
}, 'O tipo da conta pode ser apenas "conta_poupanca" ou "conta_corrente".')

bankAccountSchema.path('account_status').validate((accountStatus) => {
    if(accountStatus == 'opened' || accountStatus == 'closed') return true
    else return false
}, 'O status da conta pode ser apenas "opened" ou "closed".')

const bankAccount = mongoose.model('BankAccount', bankAccountSchema)
module.exports = bankAccount