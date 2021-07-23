$(document).ready(() => {
    var name, email, subject, message;
    $('#send_contact').click(() => {
        name = $('#name').val();
        email = $('#email').val();
        subject = $('#subject').val();
        message = $('#message').val();
        if(name == '' || email == '' || subject == '' || message == '') return;
        $.post('/contact', {name:name,email:email,subject:subject,message:message},(data) => {
            if(data == '31') console.log('veri true geldi');
            else console.log('veri false geldi.');
        });
    });
});