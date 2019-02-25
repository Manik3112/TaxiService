/*
* Query on User Array Class Object
* Author : Manik Rastogi
*/

const { runQuery } = require('./dbcon.js')

/* Add Driver to Database
* @Obj - name:{String},password:{String}
*/
exports.addDriver = Promise.coroutine(function* (obj, req, res) {
	try {
		let sql = 'insert into driver (name,email,password,car_name,car_number,status) values (?,?,?,?,?,?)'
		let values = [obj.name,obj.email,obj.password,obj.car_name,obj.car_number,0]
		yield runQuery(sql,values)
		res.status(200).send({"status":"200","msg":"Values Added Successfully"})
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
        	"status" : "400",
        	"msg" : err.message
        })
    }
})
/* Get Driver from Database
* @body - email:{String},password:{String}
*/
exports.getDriver = (email,pass) => {
	let flag = 0
    let sql = `select * from driver where email = '${email}'`
    return new Promise(async function(resolve, reject) {
        let rows = await runQuery(sql)
        if(rows.length === 0) reject()
        else{
            if(rows[0].password === pass){
                flag = 1
                resolve(['1',rows[0]]);
            }
        	if(flag === 0){
            	reject()
        	}
        }

    })
}
/* Change Driver Status
* @Obj - status:{Numeric},driverId:{Numeric}
*/
exports.driverStatus = Promise.coroutine(function* (status,driverId ,res) {
    try {
        let sql = `update driver set status = '${status}' where driver_id = '${driverId}'`
        yield runQuery(sql)
    } catch (err) {
        console.error(err.message);
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
exports.isOnline = Promise.coroutine(function* (driverId, res, next) {
    try{
        let sql = `SELECT status from driver WHERE driver_id = '${driverId}' AND status = 1`
        let rows = yield runQuery(sql)
        if(rows.length === 0){
            throw {message:"Driver is Not Online"}
        }
        next()
    } catch (err) {
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})
exports.isRegister = Promise.coroutine(function* (email, res, next){
    try{
        let sql = `SELECT email from driver WHERE email = '${email}'`
        let rows = yield runQuery(sql)
        if(rows.length === 0){
            next()
        }
        else{
            throw {message:"User Already Exist"}
        }
    } catch (err){
        res.status(400).json({
            "status" : "400",
            "msg" : err.message
        })
    }
})