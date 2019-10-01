const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://airbnb:airbnb@cluster0-lmape.mongodb.net/airbnbClone?retryWrites=true&w=majority', {
    useNewUrlParser:true, 
    useUnifiedTopology: true 
})