/*
* Authentication and Validation
* Author : Manik Rastogi
*/

const fs = require('fs')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const managerData = require('../services/manager.js')
const config = require('../../../config/default.json')
let TokenManager = undefined

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
			TokenManager = jwt.sign(tokenObj, config.keyManager)
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
	jwt.verify(TokenManager, config.keyManager, (err, decoded) => {
		if(err){
			res.send({"status":"400","msg":'Not Authorised'})
		}
		else{
			req.tokenEmail = decoded.email
			next()
		}
	})
}
