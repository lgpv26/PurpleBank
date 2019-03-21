require('./config/config')
require('./config/passport-config')
require('./models/db')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const routerIndex = require('./routes/index.routes')

const app = express()

//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())

app.use('/api', routerIndex)

//handlers
app.use((err, req, res, next) => {
    if(err.name === 'ValidationError') {
        let validationErrors = []
        Object.keys(err.errors).forEach(key => validationErrors.push(err.errors[key].message))
        res.status(422).send(validationErrors)
    }
})

//start server 
app.listen(process.env.PORT, () => console.log('Server listener on PORT:' + process.env.PORT))