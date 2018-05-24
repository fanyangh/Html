var express = require('express');
var router = express.Router();
var mysql=require('../resource/dbUtil');

router.get('/list', function(req, res, next) {
    var sql="select count(*) count from news;select * from news limit ?,?";
    var param=[(req.param('page')-1)*req.param('limit'),parseInt(req.param('limit'))];
    mysql.query(sql,param,function(err,result){
        if(err) {
            throw err;
        }
        res.send({data:result[1],count:result[0][0].count,code:0,msg:'调用成功'});
    });
});

module.exports = router;
