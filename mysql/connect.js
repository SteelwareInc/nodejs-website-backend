const mysql = require('mysql');
const log = require('../log');

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

module.exports = {connection};
