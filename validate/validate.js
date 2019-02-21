/*
* Authentication and Validation
* Author : Manik Rastogi
*/

const fs = require('fs')
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const userData = require('../models/user.js');
const managerData = require('../models/manager.js');
const driverData = require('../models/driver.js');

let TokenUser = undefined
let TokenDriver = undefined
let TokenManager = undefined

//###############################User###########################################
/*
*@body - name:{String},email:{String},pass:{String}
*/
exports.vRegisterUser = (req, res, next) => {
	const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        pass: Joi.string().required()
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
exports.vLoginUser = (req, res, next) => {
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
exports.authLogin = (req, res, next) => {
	let User = 0

	userData.getUser(req.body.email,req.body.pass)
	.then((data)=>{
		if(data[0] == 1){
			let tokenObj = {}
			tokenObj.email = req.body.email
			tokenObj.userId = data[1].user_id
			TokenUser = jwt.sign(tokenObj, 'user')
			req.Token = TokenUser
			req.Name = data[1].name
			req.Email = data[1].email
			next()
		}
		else{
			res.status(400).send({"status":"400","msg":err.message})
		}
	}).catch((err)=>{
		res.send({"status":"400","msg":'User Id/Password Not Matched'})
	})
}

/*
*@req.tokenEmail:{Encrpyted String}
*/
exports.userToken = (req, res, next) => {
	jwt.verify(TokenUser, 'user', (err, decoded) => {
		if(err){
			res.send({"status":"400","msg":'Not Authorised'})
		}
		else{
			req.tokenEmail = decoded.email
			req.tokenUserId = decoded.userId
			next()
		}
	})
}

//############################Manager##########################################
/*
*@body - email:{String},pass:{String}
*/
exports.vManagerUser = (req, res, next) => {
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
exports.authManager = (req, res, next) => {
	let User = 0

	managerData.getManager(req.body.email,req.body.pass)
	.then((data)=>{
		if(data[0] == 1){
			let tokenObj = {}
			tokenObj.email = req.body.email
			TokenManager = jwt.sign(tokenObj, 'manager')
			req.Token = TokenManager
			req.Name = data[1].name
			req.Email = data[1].email
			next()
		}
		else{
			res.status(400).send({"status":"400","msg":err.message})
		}
	}).catch((err)=>{
		res.send({"status":"400","msg":'User Id/Password Not Matched'})
	})
}
exports.managerToken = (req, res, next) => {
	jwt.verify(TokenManager, 'manager', (err, decoded) => {
		if(err){
			res.send({"status":"400","msg":'Not Authorised'})
		}
		else{
			req.tokenEmail = decoded.email
			next()
		}
	})
}

//###################################Driver#########################################
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
			TokenDriver = jwt.sign(tokenObj, 'driver')
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
	jwt.verify(TokenDriver, 'driver', (err, decoded) => {
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
	jwt.verify(TokenDriver, 'driver', (err, decoded) => {
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
