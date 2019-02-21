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
		this.bookingId = bookingId
		this.driverId = driverId
		this.time = time
		this.sql = sql
	}
	addLogs(){
		let logData = {
			email: this.email,
			booking_id: this.bookingId,
			driver_id: this.driverId,
			query: this.sql,
			time_stamp: this.time
		}
		conn.collection('manager').insertOne(logData, (err, result)=>{
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
		this.bookingId = bookingId
		this.userId = userId
		this.sql = sql
		this.time = time
	}
	addLogs(){
		let logData = {
			email: this.email,
			booking_id: this.bookingId,
			user_id: this.userId,
			query: this.sql,
			time_stamp: this.time
		}
		conn.collection('driver').insertOne(logData, (err, result)=>{
			if(err) return(err.message)
			else{
				console.log("Log Added")
				return 1
			}
		})
	}
}

module.exports = { managerLogs, driverLogs }