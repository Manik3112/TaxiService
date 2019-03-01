/*
* Authentication and Validation
* Author : Manik Rastogi
*/

const fs = require('fs')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const driverData = require('../services/driver.js')
const config = require('../../../config/default.json')
let TokenDriver = undefined

/*
*@body - name:{String},email:{String},pass:{String}
*/
exports.vRegisterDriver = (req, res, next) => {
	const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        pass: Joi.string().required(),
        car_name: Joi.string().required(),
        car_number: Joi.string().required()
    });
    Joi.validate(req.body, schema, async (err,result) => {
    	if(err){
    		res.status(400).send({"status":"400","msg":err.message})
    	}
    	else{
    		next()
    	}
    })
}
/*
*@body - email:{String},pass:{String}
*/
exports.vLoginDriver = (req, res, next) => {
	const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        pass: Joi.string().required()
    });
    Joi.validate(req.body, schema, (err,result) => {
    	if(err){
    		res.status(400).send({"status":"400","msg":err.message})
    	}
    	else{
    		next()
    	}
    })
}
/*
*@body - email:{String},pass:{String}
* Create Token
*/
exports.authDriver = (req, res, next) => {
	let User = 0

	driverData.getDriver(req.body.email,req.body.pass)
	.then((data)=>{
		if(data[0] == 1){
			let tokenObj = {}
			tokenObj.email = req.body.email
			tokenObj.driverId = data[1].driver_id
			TokenDriver = jwt.sign(tokenObj, config.keyDriver)
			req.Token = TokenDriver
			req.Name = data[1].name
			req.Email = data[1].email
			req.driverId = data[1].driver_id
			next()
		}
		else{
			res.status(400).send({"status":"400","msg":err.message})
		}
	}).catch((err)=>{
		res.send({"status":"400","msg":'User Id/Password Not Matched'})
	})
}
exports.driverToken = (req, res, next) => {
	jwt.verify(TokenDriver, config.keyDriver, (err, decoded) => {
		if(err){
			res.send({"status":"400","msg":'Not Authorised'})
		}
		else{
			req.tokenEmail = decoded.email
			req.driverId = decoded.driverId
			next()
		}
	})
}
exports.vDriverLogout = (req, res, next) => {
	jwt.verify(TokenDriver, config.keyDriver, (err, decoded) => {
		if(err){
			res.send({"status":"400","msg":'Not Logged In'})
		}
		else{
			req.driverId = decoded.driverId
			TokenDriver = undefined
			next()
		}
	})
}
