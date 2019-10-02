const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')


const upload = multer(uploadConfig)
const routes = express.Router()

routes.post('/spots/:spot_id/bookings', BookingController.store)

routes.post('/sessions', SessionController.store)

routes.post('/spots',upload.single('thumbnail'),SpotController.store)
routes.get('/spots',SpotController.index)

routes.get('/dashboard',DashboardController.show)

module.exports = routes 