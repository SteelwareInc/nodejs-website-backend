const mysql = require('mysql');
const log = require('../util');

var connection = mysql.createConnection({
    host: null,
    user: 'TNYCL',
    password: null,
    database: null,
    port: '3306'
});

connection.connect(async (error) => {
    if(error) throw error;
    else log.success('MySQL bağlantısı kuruldu.');
});

async function getData(key, callback) {
    var sql = "SELECT * FROM short_link WHERE short_key='"+key+"'";
    connection.query(sql, (error, result) => {
        if(error) throw error;
        if(result == '') {
            return callback(null, null);
        } else {
            return callback(null, result[0].link);
        }
    });
}

module.exports = { connection,getData };
