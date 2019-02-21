/*
* Query on User Array Class Object
* Author : Manik Rastogi
*/

const { runQuery } = require('./dbcon.js')
const { managerLogs, driverLogs } = require('./mongodb.js')

/* 
* @body - obj:{Object},userId:{String}
*/
exports.addBooking = Promise.coroutine(function* (userId, obj, res) {
	try {
		let sql = 'insert into booking (user_id, driver_id, status, from_lat, from_long, to_lat, to_long) values (?,?,?,?,?,?,?)'
		let values = [userId,1,0,obj.fromLat,obj.fromLong,obj.fromLat,obj.toLong]
		yield runQuery(sql,values)
		res.status(200).send({"status":"200","msg":"Successfully Booked your Ride"})
    } catch (err) {
        console.error(err.message)
        res.status(400).json({
        	"status" : "400",
        	"msg" : err.message
        })
    }
})
/* Return Booking wrt status
* @body - status:{Numeric}
*/
exports.showBooking = Promise.coroutine(function* (status,res) {
    try {
        let sql = `select booking.booking_id, user.user_name, booking.from_lat, booking.from_long, booking.to_lat, booking.to_long, driver.name, booking.time_end from booking 
        INNER JOIN user on booking.user_id = user.user_id
        INNER JOIN driver on booking.driver_id = driver.driver_id  where booking.status = ${status}`
        let rows = yield runQuery(sql)
        res.status(200).send({
            "status":"200",
            "msg":"OK",
            "data":rows
        })
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
/* Show Free Driver to assign to bookingId
* @body - bookingId:{Numeric}
*/
exports.showFreeDriver = Promise.coroutine(function* (bookingId, res) {
    try {
        let sql = `select * from driver where status = 1`
        let rows = yield runQuery(sql)
        res.status(200).send({
            "status":"200",
            "msg":"OK",
            "data":rows
        })
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
/*  Show All Driver
* @body -
*/
exports.showDriver = Promise.coroutine(function* (res) {
    try {
        let sql = `select driver_id, name, car_name, car_number, status from driver where driver_id > 0`
        let rows = yield runQuery(sql)
        res.status(200).send({
            "status":"200",
            "msg":"OK",
            "data":rows
        })
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
/* Asign booking a Driver
* @body - bookinfId{Num}, driverId{Num}, email{String}
*/
exports.asignDriver = Promise.coroutine(function* (bookingId, driverId, res, email) {
    try {
        let sql = `UPDATE booking SET status = 1, driver_id = ${driverId} WHERE booking_id = ${bookingId}`
        let rows = yield runQuery(sql)
        let time = new Date()
        let log = new managerLogs(email, bookingId, driverId, sql, time)
        if(rows.affectedRows != 0){
            log.addLogs()
            res.status(200).send({
                "status":"200",
                "msg":"OK",
                "data":"Driver is Asigned"
            })
        }
        else{
            throw {"message":"Not Assigned"}
        }
    } catch (err) {
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
/* Show User Booking
* @body - userId:{String}
*/
exports.userBooking = Promise.coroutine(function* (userId, res) {
     try {
        let sql = `select driver.name, driver.car_name, driver.car_number, booking.from_lat, booking.from_long, booking.to_lat, booking.to_long from booking 
        INNER JOIN driver on driver.driver_id = booking.driver_id 
        where booking.user_id = ${userId} AND booking.status = 1`
        let rows = yield runQuery(sql)
        res.status(200).send({
            "status":"200",
            "msg":"OK",
            "data":rows
        })
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
/* 
* @body - userId:{String}
*/
exports.userPastBooking = Promise.coroutine(function* (userId, res) {
     try {
        let sql = `select  driver.name, driver.car_name, driver.car_number, booking.from_lat, booking.from_long, booking.to_lat, booking.to_long, booking.time_end from booking 
        INNER JOIN driver on driver.driver_id = booking.driver_id 
        where booking.user_id = ${userId} AND booking.status = 2`
        let rows = yield runQuery(sql)
        res.status(200).send({
            "status":"200",
            "msg":"OK",
            "data":rows
        })
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
/* Complete a Processed Ride
* @body - userId:{String}
*/
exports.completeRide = Promise.coroutine(function* (driverId, res, email) {
    try {
        let sql0 = `SELECT booking_id,user_id from booking WHERE status = 2 AND driver_id = ${driverId}`
        let rows0 = yield runQuery(sql0)
        let sql = `UPDATE booking SET status = 2 WHERE driver_id = ${driverId} AND status = 1`
        let rows = yield runQuery(sql)
        let time = new Date()
        let log = new driverLogs(email, rows0[0].booking_id, rows0[0].user_id, sql, time)
        log.addLogs()
        res.status(200).send({
            "status":"200",
            "msg":"OK",
            "data":"Ride is Completed"
        })
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
/* Driver can View his Booking
* @body - driverId:{Number}
*/
exports.driverBooking = Promise.coroutine(function* (driverId, res) {
    try {
        let sql = `select user.user_name, booking.from_lat, booking.from_long, booking.to_lat, booking.to_long
        from user, booking WHERE booking.status = 1`
        let rows = yield runQuery(sql)
        res.status(200).send({
            "status":"200",
            "msg":"OK",
            "data":rows
        })
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})