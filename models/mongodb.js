/*
* Author : Manik Rastogi
*/
// Mongo
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

MongoClient.connect(url, { useNewUrlParser: true }, async function(err, db) {
	if (err) throw err;
	try{
		global.conn = await db.db("cab_taxi")
		console.log(conn.databaseName+" Connected")
	  	} catch(err){
	}
})

class managerLogs{
	constructor(email, bookingId, driverId, sql, time){
		this.email = email
		this.bookingId = parseInt(bookingId)
		this.driverId = parseInt(driverId)
		this.time = time
		this.sql = sql
	}
	addLogs(){
		let logData = {
			booking_id: this.bookingId,
			driver_id: this.driverId,
			data:{
				email: this.email,
				message: "Assinged a Driver",
				query: this.sql,
				time_stamp: this.time
			}
		}
		conn.collection('Logs').updateOne({'booking_id':logData.booking_id},{$set:{'driver_id':logData.driver_id},$push :{'data':logData.data}},{upsert : true}, (err, result)=>{
			if(err) return(err.message)
			else{
				console.log("Log Added")
				return 1
			}
		})
	}
}
class driverLogs{
	constructor(email, bookingId, userId, sql, time){
		this.email = email
		this.bookingId = parseInt(bookingId)
		this.userId = parseInt(userId)
		this.sql = sql
		this.time = time
	}
	addLogs(){
		let logData = {
			booking_id: this.bookingId,
			user_id: this.userId,
			data:{
				email: this.email,
				message: "Completed a Booking",
				query: this.sql,
				time_stamp: this.time
			}
		}
		conn.collection('Logs').updateOne({'booking_id':logData.booking_id},{$set:{'user_id':logData.user_id} , $push :{'data':logData.data}},{upsert : true}, (err, result)=>{
			if(err) return(err.message)
			else{
				console.log("Log Added")
				return 1
			}
		})
	}
}

module.exports = { managerLogs, driverLogs }