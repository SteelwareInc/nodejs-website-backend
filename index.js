const express = require('express');
const mysql = require('./db/mysql');
const redis = require('./db/redis');
const path = require('path');
const helmet = require('helmet');
const util = require('./util');
const sendMail = require('./util/mail');

const app = express();
const port = 3333;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', async(req, res) => {
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

app.post('/contact', (req, res) => {
    var { name, email, subject, message } = req.body;
    /*var ipAddress = 
    if(redis.client.hmget('contact', ''))*/
    sendMail(name, email, subject, message, (error, data) => {
        if(error) res.send({error:1});
        else res.send({sended:true});
    });
});

app.use((req, res) => {
    sendTo(res, '/');
});

app.disable('x-powered-by');
app.use(helmet());
app.listen(port, () => { util.info('Dinlenen port: ' + port) });

function sendTo(res, url) {
    res.statusCode = 302;
    res.setHeader('Location', url);
    res.end();
}