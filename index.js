const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('./mysql/util');
const path = require('path');
const helmet = require('helmet');

const app = express();
const port = 3333;

app.get('/', (req, res) => {
    var token = req.query.link;
    if(token) {
        mysql.getData(token, (error, data) => {
            if(data == null) {
                sendTo(res, '/');
            } else {
                sendTo(res, data);
            }
        });
        return;
    }
    res.sendFile(path.join(__dirname, './index.html'));
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

app.get('/test', (req, res) => {
    const token = req.query.token;
    if(token == 'test') res.send('şifre doğru');
    else res.send('şifre yanlış');
});

app.post('/contact', (req, res) => {
    res.end('31');
});

app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use((req, res) => {
    sendTo(res, '/');
});
app.listen(port, () => { console.log('Web server başlatıldı, dinlenen port: ' + port) });

function sendTo(res, url) {
    res.statusCode = 302;
    res.setHeader('Location', url);
    res.end();
}