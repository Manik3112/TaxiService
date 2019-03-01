/*
* Authentication and Validation
* Author : Manik Rastogi
*/

const fs = require('fs')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const userData = require('../services/user.js')
const config = require('../../../config/default.json')
let TokenUser = undefined
/*
*@body - name:{String},email:{String},pass:{String}
*/
exports.vRegisterUser = (req, res, next) => {
	const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        pass: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/).required()
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
			TokenUser = jwt.sign(tokenObj, config.keyUser)
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
	jwt.verify(TokenUser, config.keyUser, (err, decoded) => {
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
