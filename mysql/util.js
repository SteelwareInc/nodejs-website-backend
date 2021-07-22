const mysql = require('../mysql/connect');
const log = require('../log');

async function getData(key, callback) {
    var sql = "SELECT * FROM short_link WHERE short_key='"+key+"'";
    mysql.connection.query(sql, (error, result) => {
        if(error) throw error;
        if(result == '') {
            return callback(null, null);
        } else {
            return callback(null, result[0].link);
        }
    });
}

module.exports = { getData };