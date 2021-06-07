var root = require('./get/root');
var download = require('./get/download');
var upload = require('./post/upload');
var signIn = require('./post/signIn-server');
var signUp = require('./post/signUp-server');
module.exports={
    root,
    download,
    upload,
    signIn,
    signUp
}
