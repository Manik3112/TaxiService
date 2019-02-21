
/*
* User Function called by Routes
* Author : Manik Rastogi
*/
const userData = require('../models/user.js');
const bookData = require('../models/booking.js');

// @Body - userName:{String},userEmail:{String},userPassword:{String}
let userLogin = (req, res) => {
	res.status(200).send({
		"status":"200",
		"msg":"User successfully Login",
		"data":{
			"Token":req.Token,
			"Name":req.Name,
			"Email":req.Email
		}
	})
}

// @Body - userName:{String},userEmail:{String},userPassword:{String}
let userRegister = (req, res) => {
	let userName = req.body.name
	let userEmail = req.body.email
	let userPassword = req.body.pass
	userData.addUser({
		name: userName,
		email: userEmail,
		password: userPassword
	},req,res)
}
// @Body - fromLat/fromLong/toLat/toLong - {number}
let createBooking = (req, res) => {
	let location = {
		fromLat : req.body.from_lat,
		fromLong : req.body.from_long,
		toLat : req.body.to_lat,
		toLong : req.body.to_long
	}
	bookData.addBooking(req.tokenUserId,location,res)
}
/* Show Booking of User
*  @Body - Token
*/
let showBooking = (req, res) => {
	bookData.userBooking(req.tokenUserId,res)
}
/*
* For Showing Booking History
*/
let bookingHistory = (req, res) => {
	bookData.userPastBooking(req.tokenUserId,res)
}

module.exports = { userLogin, userRegister, createBooking, showBooking, bookingHistory }