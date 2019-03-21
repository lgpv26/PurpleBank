const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const AccountUser = require('../models/user.model')

passport.use(
    new localStrategy({ usernameField: 'cpf' }, 
        (username, password, done) => {
            AccountUser.findOne({ cpf: username },
                (err, user) => {
                    if(err) return done(err)
                    else if(!user) return done(null, false, {message: 'Não encontramos nenhum registro com esse CPF.'})
                    else if(!user.verifyPassword(password)) return done(null, false, {message: 'Senha incorreta.'})
                    else return done(null, user)
                })
        })
)