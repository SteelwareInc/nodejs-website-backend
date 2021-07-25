const redis = require('redis');
const log = require('../util');
const client = redis.createClient(6379, null);
client.auth(null);
client.select(0);

client.on('connect', () => {
    log.success('Redis bağlantısı kuruldu.');
});

module.exports = { client };