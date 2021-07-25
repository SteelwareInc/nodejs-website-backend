$(document).ready(() => {
    var name, email, subject, message;
    $('#send_contact').click(() => {
        name = $('#name').val();
        email = $('#email').val();
        subject = $('#subject').val();
        message = $('#message').val();
        if(name == '' || email == '' || subject == '' || message == '') return;
        const data = {
            name,
            email,
            subject,
            message
        };
        $.post('/contact', data, () => {});
    });
});