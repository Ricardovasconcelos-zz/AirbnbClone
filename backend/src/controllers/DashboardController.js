const Spot = require('../model/Spot')

module.exports = {
    async show(req,res){
        const {user_id} = req.headers
                    //buscando todos os spots, que o campo user no bd é igual ao user_id
        const spots = await Spot.find({user: user_id})

        return res.json(spots)
    }
}