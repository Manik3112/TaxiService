/*
* Query on User Array Class Object
* Author : Manik Rastogi
*/

const { runQuery } = require('../../../database/dbcon.js')
let Promise = require("bluebird")

/*
* @Obj - name:{String},password:{String}
*/
exports.addUser = Promise.coroutine(function* (obj, req, res) {
	try {
		let sql = 'insert into user (user_name,email,password) values (?,?,?)'
		let values = [obj.name,obj.email,obj.password]
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
/*
* @body - name:{String},password:{String}
*/
exports.getUser = (email,pass) => {
	let flag = 0
    let sql = `select * from user where email = '${email}'`
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
exports.isRegister = Promise.coroutine(function* (email, res, next){
    try{
        let sql = `SELECT email from user WHERE email = '${email}'`
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
