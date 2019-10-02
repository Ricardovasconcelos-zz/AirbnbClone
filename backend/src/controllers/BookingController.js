const Booking = require('../model/Booking')

module.exports = {
    async store(req,res){

        const { date } = req.body
        const { user_id } = req.headers
        const { spot_id } = req.params
        
        const booking = await Booking.create({
            date,
            user: user_id,
            spot: spot_id,
        })
        
        //pegando todos os dados de spot e user
        await booking.populate('spot').populate('user').execPopulate()


        return res.json(booking)
    }
}
