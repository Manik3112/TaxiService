const express = require('express')
const Manager = require('./controllers/manager.js')
const Driver = require('../driver/controllers/driver.js')
const Validate = require('./validate/validate.js')
const managerRoutes = express.Router()


// Manager Routes
managerRoutes.post('/login', Validate.vManagerUser, Validate.authManager, Manager.managerLogin) //{email,pass}
managerRoutes.get('/booking', Validate.managerToken, Manager.showBooking) //{email,pass}
managerRoutes.get('/booking/:bookingId', Validate.managerToken, Manager.bookingExist, Manager.showFreeDriver) //{email,pass}
managerRoutes.put('/booking/:bookingId/:driverId', Validate.managerToken, Manager.bookingExist, Driver.isOnline, Manager.asignDriver) //{email,pass}
managerRoutes.get('/process', Validate.managerToken, Manager.processBooking) //{email,pass}
managerRoutes.get('/driver', Validate.managerToken, Manager.showDriver) //{email,pass}
managerRoutes.get('/liveDriver', Validate.managerToken, Manager.showLiveDriver) //{email,pass}
managerRoutes.get('/pastBooking', Validate.managerToken, Manager.pastBooking) //{email,pass}

module.exports = { managerRoutes }