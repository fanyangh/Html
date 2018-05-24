var mysql=require('mysql');
var pool=mysql.createPool({
    connectionLimit:20,
    multipleStatements:true,
    host:'localhost',
    user:'root',
    password:'ychh1029',
    port:'3306',
    database:'test'
});

exports.query=function (sql,params,callback) {
    console.log('sql---->',sql);
    console.log('params---->',params);
    pool.getConnection(function (err,connection) {
        if(err){
            console.log('[MYSQL CONNECTION ERROR]');
            return;
        }
        connection.beginTransaction(function (err) {
            if (err) {
                console.log('[MYSQL BEGINTRANSACTION ERROR]');
                callback(err, null);
            }
            connection.query(sql, params, function (err, result) {
                if (err) {
                    console.log('[MYSQL QUERY ERROR]');
                    connection.rollback(function () {
                        console.log('[MYSQL DATA ROLLBACK]');
                        //释放资源
                        connection.release();
                    });
                    callback(err, null);
                    return;
                }
                console.log('result---->',result);
                callback(null, result);
                connection.commit();
            });
            connection.release();
        });
    });
};


