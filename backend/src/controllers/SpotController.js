const Spot = require('../model/Spot')
const User = require('../model/User')
module.exports = {
    async index(req,res){
        const {city} = req.query
        const spots = await Spot.find({city: city})

        return res.json(spots)
    },


    async store(req,res){

        const { filename } = req.file
        const { title, city, price, itens } = req.body
        const { user_id } = req.headers

        const user = await User.findById(user_id)

        if(!user){
            return res.status(400).json({error: 'User does not exist'})
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            title,
            city,
            price,
            itens: itens.split(',').map(item => item.trim())
        })

        return res.json(spot)
    }
}
