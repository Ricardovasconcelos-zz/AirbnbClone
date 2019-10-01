const express = require('express')

const routes = express.Router()

routes.get('/airbnb', (req,res)=>{
    res.send('air is OK')
})

module.exports = routes 