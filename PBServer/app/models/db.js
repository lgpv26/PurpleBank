const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err) => {
    if(err) JSON.stringify(err, undefined, 2)
    else console.log('MongoDB conected successfully!')
})