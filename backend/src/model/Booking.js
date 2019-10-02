const {Schema, model} = require('mongoose')

const Booking = new Schema({
    date: String,
    approved: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: Schema.Types.ObjectId,
        ref: 'Spot'
    }
    
})

module.exports = model('Booking', Booking)