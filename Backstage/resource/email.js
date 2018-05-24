var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service:'qq',
    auth:{
        user:'1652714892@qq.com',
        pass:'1343580610yczxhh'//授权码
    }
});

exports.send=function(mailOptions,callback){
    transporter.sendMail(mailOptions,callback);
};