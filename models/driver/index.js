const express = require('express')
const Driver = require('./controllers/driver.js')
const Validate = require('./validate/validate.js')
const driverRoutes = express.Router()


// Driver Routes
driverRoutes.post('/register', Validate.vRegisterDriver, Driver.isRegister, Driver.driverRegister)	//{email,name,pass,car_name,car_number}
driverRoutes.post('/login', Validate.vLoginDriver, Validate.authDriver, Driver.driverLogin) //{email,pass}
driverRoutes.get('/booking', Validate.driverToken, Driver.booking)
driverRoutes.put('/complete', Validate.driverToken, Driver.complete)
driverRoutes.delete('/logout', Validate.vDriverLogout, Driver.driverLogout)

module.exports = { driverRoutes }