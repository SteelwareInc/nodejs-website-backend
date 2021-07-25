const mail = require('nodemailer');

var transport = mail.createTransport({
    pool: true,
    host: null,
    port: 465,
    secure: true,
    auth: {
        user: 'contact@tnycl.net',
        pass: null
    }
});

const sendMail = (name, email, subject, message) => {
    const mailOptions = {
        sender: name,
        from: 'contact@tnycl.net',
        to: 'contact@tnycl.net',
        subject: subject + ' - ' + email,
        text: 'Name: ' + name + ' E-mail: ' + email + ' Subject: ' + subject + ' Message: ' + message  
    };
    return transport.sendMail(mailOptions);
}

module.exports = sendMail;