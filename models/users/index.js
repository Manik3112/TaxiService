const express = require('express')
const User = require('./controllers/user.js')
const Validate = require('./validate/validate.js')
var userRoutes = express.Router()

// User Routes
userRoutes.post('/register', Validate.vRegisterUser, User.isRegister, User.userRegister)	//{email,name,pass}
userRoutes.post('/login', Validate.vLoginUser, Validate.authLogin, User.userLogin) //{email,pass}
userRoutes.post('/createBooking', Validate.userToken, User.createBooking) //{fromLat, fromLong, toLat, toLong}
userRoutes.get('/booking', Validate.userToken, User.showBooking)
userRoutes.get('/bookingHistory', Validate.userToken, User.bookingHistory)

module.exports = { userRoutes }