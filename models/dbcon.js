var mysql      = require('mysql');
const util = require('util');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root', 
    password : '', // Y
    database : 'taxi_pool'  
});

// Create Promise : Query Executuion
const runQuery = util.promisify(connection.query).bind(connection);

module.exports = { runQuery }