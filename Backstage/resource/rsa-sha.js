var crypto=require('crypto');
var sha1=crypto.createHash('sha1');
/**
 * 密码加密
 */
exports.md5=function (password,callback) {
   sha1.update(password);
   callback(sha1.digest('hex'));
}