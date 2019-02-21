
/*
* User Function called by Routes
* Author : Manik Rastogi
*/

const driverData = require('../models/driver.js');
const bookData = require('../models/booking.js');

// @Body - userName:{String},userEmail:{String},userPassword:{String}
let driverLogin = (req, res) => {
    driverData.driverStatus(1,req.driverId, res)
    res.status(200).send({"status":"200","msg":"User successfully Login","data":{"Token":req.Token,"Name":req.Name,"Email":req.Email}})
}

// @Body - userName:{String},userEmail:{String},userPassword:{String}
let driverRegister = (req, res) => {
    let userName = req.body.name
    let userEmail = req.body.email
    let userPassword = req.body.pass
    let carName = req.body.car_name
    let carNumber = req.body.car_number
    driverData.addDriver({
        name: userName,
        email: userEmail,
        password: userPassword,
        car_name: carName,
        car_number: carNumber
    },req,res)
}
// @Body - Token
let driverLogout = (req, res) => {
    driverData.driverStatus(0,req.driverId, res)
    res.status(200).send({"status":"200","msg":"Driver successfully Logout"})

}
// @Body - Token
let booking = (req, res) => {
    bookData.driverBooking(req.driverId, res)
}
// @Body - Token
let complete = (req, res) => {
    bookData.completeRide(req.driverId, res, req.tokenEmail)
}

module.exports = { driverLogin, driverRegister, driverLogout, booking, complete }