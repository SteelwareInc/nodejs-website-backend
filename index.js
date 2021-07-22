const express = require('express');
const mysql = require('./mysql/util');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const port = 3333;

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
    res.has
});

app.get('/link/:token', async(req, res) => {
    var token = req.params.token;
    mysql.getData(token, (error, data) => {
        if(data == null) {
            sendTo(res, '/');
        } else {
            sendTo(res, data);
        }
    });
});

app.use(express.static(path.join(__dirname, './assets')));
app.use((req, res) => {
    sendTo(res, '/');
});
app.listen(port, () => { console.log('Web server başlatıldı, dinlenen port: ' + port) });

function sendTo(res, url) {
    res.statusCode = 302;
    res.setHeader('Location', url);
    res.end();
}