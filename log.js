
function info(message){
    return console.log('[INFO] ' + message);
}

function success(message){
    return console.log('[SUCCESS] ' + message)
}

function error(message){
    return console.log('[ERROR] ' + message);
}

module.exports = {info,success,error};