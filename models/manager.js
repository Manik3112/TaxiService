/*
* Query on User Array Class Object
* Author : Manik Rastogi
*/

const { runQuery } = require('./dbcon.js')

/*
* @Body - email:{String},password:{String}
*/
exports.getManager = (email,pass,next) => {
    let flag = 0
    let sql = `select * from admin where email = '${email}'`
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