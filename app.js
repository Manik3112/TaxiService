/*
* Author : Manik Rastogi
*/
global.Promise = require("bluebird")
const express = require('express')
const bodyParser = require('body-parser')
const User = require('./controllers/user.js')
const Manager = require('./controllers/manager.js')
const Driver = require('./controllers/driver.js')
const Validate = require('./validate/validate.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express()
var userRoutes = express.Router()
var managerRoutes = express.Router()
var driverRoutes = express.Router()
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// Basic Routing
app.get('/', (req, res) => {
	res.send('Welcome Abroad')
})

// ROUTES Middleware
app.use('/manager', managerRoutes)
app.use('/user', userRoutes)
app.use('/driver', driverRoutes)

// Manager Routes
managerRoutes.post('/login', Validate.vManagerUser, Validate.authManager, Manager.managerLogin) //{email,pass}
managerRoutes.get('/booking', /*Validate.managerToken,*/ Manager.showBooking) //{email,pass}
managerRoutes.get('/booking/:bookingId', /*Validate.managerToken,*/ Manager.showFreeDriver) //{email,pass}
managerRoutes.put('/booking/:bookingId/:driverId', /*Validate.managerToken,*/ Manager.asignDriver) //{email,pass}
managerRoutes.get('/process', /*Validate.managerToken,*/ Manager.processBooking) //{email,pass}
managerRoutes.get('/driver', /*Validate.managerToken,*/ Manager.showDriver) //{email,pass}
managerRoutes.get('/pastBooking', /*Validate.managerToken,*/ Manager.pastBooking) //{email,pass}

// User Routes
userRoutes.post('/register', Validate.vRegisterUser, User.userRegister)	//{email,name,pass}
userRoutes.post('/login', Validate.vLoginUser, Validate.authLogin, User.userLogin) //{email,pass}
userRoutes.post('/createBooking', Validate.userToken, User.createBooking) //{fromLat, fromLong, toLat, toLong}
userRoutes.get('/booking', Validate.userToken, User.showBooking)
userRoutes.get('/bookingHistory', Validate.userToken, User.bookingHistory)

// Driver Routes
driverRoutes.post('/register', Validate.vRegisterDriver, Driver.driverRegister)	//{email,name,pass,car_name,car_number}
driverRoutes.post('/login', Validate.vLoginDriver, Validate.authDriver, Driver.driverLogin) //{email,pass}
driverRoutes.get('/booking', Validate.driverToken, Driver.booking)
driverRoutes.delete('/complete', Validate.driverToken, Driver.complete)
driverRoutes.delete('/logout', Validate.vDriverLogout, Driver.driverLogout)

// Swagger 
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Listening to Port
app.listen(8081,()=>{console.log("Listening")})