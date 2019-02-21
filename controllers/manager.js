
/*
* User Function called by Routes
* Author : Manik Rastogi
*/

const managerData = require('../models/manager.js');
const bookData = require('../models/booking.js');

/* For User Login
* @Body - userName:{String},userEmail:{String},userPassword:{String}
*/
let managerLogin = (req, res) => {
	res.status(200).send({"status":"200","msg":"Manager successfully Login","data":{"Token":req.Token,"Name":req.Name,"Email":req.Email}})
}
/*
* For Showing Current Booking
*/
let showBooking = (req, res) => {
	bookData.showBooking(0,res)
}
/*
* For Showing Processng Booking
*/
let processBooking = (req, res) => {
	bookData.showBooking(1,res)
}
/*
* For Showing Past Booking
*/
let pastBooking = (req, res) => {
	bookData.showBooking(2,res)
}
/*
* For Showing Free Driver
*/
let showFreeDriver = (req, res) => {
	let bookingId = req.params.bookingId
	bookData.showFreeDriver(bookingId,res)
}
/*
* For Showing All Driver
*/
let showDriver = (req, res) => {
	bookData.showDriver(res)
}
/*
* For Assigning a Driver to Booking
*/
let asignDriver = (req, res) => {
	bookData.asignDriver(req.params.bookingId, req.params.driverId, res, req.tokenEmail)
}

module.exports = { managerLogin, showBooking, showFreeDriver, processBooking, showDriver, asignDriver, pastBooking }