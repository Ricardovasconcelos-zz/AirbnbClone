const Booking = require('../model/Booking')


module.exports = {
    async store (req,res){
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot')

        booking.approved = true    

        const BookingUserSocket = req.connectedUsers[booking.user]
        if(BookingUserSocket){
            req.io.to(BookingUserSocket).emit('booking_response', booking)
        }

        await booking.save()

        return res.json(booking)
    }
}