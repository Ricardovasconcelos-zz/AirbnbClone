const {Schema, model} = require('mongoose')

const User = new Schema({
    email: String,
})

module.exports = model('User', User)