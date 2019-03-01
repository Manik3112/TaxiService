/*
* Author : Manik Rastogi
*/
const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./public/swagger.json')
const config = require('./config/default.json')
const { driverRoutes } = require('./models/driver/index.js')
const { managerRoutes } = require('./models/manager/index.js')
const { userRoutes } = require('./models/users/index.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// Basic Routing
app.get('/', (req, res) => {
	res.send('Welcome Abroad')
})

// ROUTES Middleware
app.use('/manager', managerRoutes)
app.use('/user', userRoutes)
app.use('/driver', driverRoutes)

// Swagger 
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Listening to Port
app.listen(config.port,()=>{console.log("Listening")})