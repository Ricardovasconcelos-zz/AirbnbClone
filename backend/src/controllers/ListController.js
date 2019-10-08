const Spot = require('../model/Spot')


module.exports = {
    async index(req,res){
        const spots = await Spot.find()

        return res.json(spots)
    }
}