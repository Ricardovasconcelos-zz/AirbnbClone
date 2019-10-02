const {Schema, model} = require('mongoose')

const Spot = new Schema({
    thumbnail:String,
    title: String,
    price:Number,
    city:String,
    itens:[String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
})

module.exports = model('Spot', Spot)