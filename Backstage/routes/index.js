var express = require('express');
var mysql=require('../resource/dbUtil');
var email=require('../resource/email');
var router = express.Router();
/*var fs=require('fs');
var path = require('path');
var moment = require('moment');
var uuid=require('node-uuid');*/

/**
 * 跳转到登录页
 */
router.get('/',function (req,res) {
   res.render('main/starline');
});
// router.get('/add',function (req,res) {
//    res.render('user/add');
// });
// router.get('/edit',function (req,res) {
//    res.render('user/edit');
// });
// router.get('/forget',function (req,res) {
//    res.render('user/forget');
// });
router.get('/main',function (req,res) {
   res.render('main/indexsee');
});
router.get('/maina',function (req,res) {
   res.render('main/indexseea');
});


// 前台登陆 （注销功能、保存图片、下载图片）
router.get('/uname',function (req,res) {
   res.render('uname/logn');
});
router.get('/Tourists',function (req,res) {
   res.render('main/indexTourists');
});
router.get('/list',function (req,res) {
   res.render('main/list');
});
router.get('/sign',function (req,res) {
   res.render('uname/sign');
});


// 登陆验证
router.post('/uname/logn', function(req, res, next) {
    var sql='select * from user where login_name=? and password=?';
    var params=[req.body.userName,req.body.password];
    mysql.query(sql,params,function (err,result) {
        if(err) {
            throw err;
        }
        if(result.length>0) {
           // res.session.user=result[0];
            res.render('main/indexa',{user:result[0]});
        }else{
            res.render('login',{message:'错误的用户名或者密码'});
        }
    });
});


//注册
router.post('/uname/sign',function(req, res) {
    
    var params=[req.body.login_name,req.body.password];
    var sql='insert into user(login_name,password)value(?,?)';
    mysql.query(sql,params,function (err,result) {
        if(err) {
            throw err;
        }
        if(result.length>0) {
           // res.session.user=result[0];
            res.render('/uname',{user:result[0]});
        }else{
            res.render('login',{message:'错误的用户名或者密码'});
        }
        
    });
    
    

});


router.get('/uname/search',function (req,res) {
    var sql1='select count(*) count from img_list ';
    var sql=";select id,userid,imgurl,desrc,label,createTime from img_list"
    var params=[];
    if(typeof req.param('userid')!='undefined'){
        sql1=sql1.concat(' where userid like ?')
        sql=sql.concat(' where userid like ?');
        params.push('%'+req.param('userid')+'%');
        params.push('%'+req.param('userid')+'%');
    }



    var pageIndex=parseInt(req.param('pageIndex'));
    var pageSize=parseInt(req.param('pageSize'));


    sql=sql.concat(' limit ?,?');
    params.push((pageIndex-1)*pageSize);
    params.push(pageSize);


    mysql.query(sql1.concat(sql),params,function (err,result) {
       if(err){
           throw err;
       }
       var data={"rel":true,"msg":"获取成功","list":result[1],"count":result[0][0].count};
       res.send(data);
    });
});

router.post('/uname/view/:id',function (req,res) {
    var sql="select * from img_list where userid = ?";
    var params={'userid':req.params.id};
    mysql.query(sql,params,function (err,result) {
       if (err){
           throw err;
       }
       res.send(result[0]);
    });
});

/**
 * 删除用户
 */
router.post('/uname/delete/:id',function (req,res) {
   var sql='delete from img_list where userid=?';
    var params={'userid':req.params.id};
   mysql.query(sql,params,function (err,result) {
      if(err){
          throw err;
      }
      res.send('success');
   });
});

// app.post('/upload', function(req, res){
//     //接收前台POST过来的base64
//     var imgData = req.body.imgData;
//     //过滤data:URL
//     var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
//     var dataBuffer = new Buffer(base64Data, 'base64');
//     fs.writeFile("out.png", dataBuffer, function(err) {
//         if(err){
//           res.send(err);
//         }else{
//           res.send("保存成功！");
//         }
//     });
// });



/**
 * 后台登录及管理
 */
router.get('/user',function (req,res) {
   res.render('user/login');
});
router.post('/user/login', function(req, res, next) {
    var sql='select * from user where login_name=? and password=?';
    var params=[req.body.userName,req.body.password];
    mysql.query(sql,params,function (err,result) {
        if(err) {
            throw err;
        }
        if(result.length>0) {
           // res.session.user=result[0];
            res.render('main/index',{user:result[0]});
        }else{
            res.render('login',{message:'错误的用户名或者密码'});
        }
    });
});

/**
 * 页面跳转
 */

// 框架内页面
router.get('/views/:dir/:file',function (req,res) {
    res.render(req.params.dir+'/'+req.params.file);
});


//注册
router.post('/user/regist',function(req, res) {
    
    var params=[req.body.login_name,req.body.password];
    var sql='insert into user(login_name,password)value(?,?)';
    mysql.query(sql,params,function (err,result) {
        if(err) {
            throw err;
        }
        if(result.length>0) {
           // res.session.user=result[0];
            res.render('user',{user:result[0]});
        }else{
            res.render('login',{message:'错误的用户名或者密码'});
        }
        
        
    });
    
    

});

//退出
router.get("/logout",function(req, res) {
    delete req.session.user;
    res.end();
})





/**
 * 会员搜索查询
 */
router.get('/user/search',function (req,res) {
    var sql1='select count(*) count from user';
    var sql=";select id,user_name,sign,createTime from user"
    var params=[];
    if(typeof req.param('user_name')!='undefined'){
        sql1=sql1.concat(' where user_name like ?')
        sql=sql.concat(' where user_name like ?');
        params.push('%'+req.param('user_name')+'%');
        params.push('%'+req.param('user_name')+'%');
    }
    var pageIndex=parseInt(req.param('pageIndex'));
    var pageSize=parseInt(req.param('pageSize'));
    sql=sql.concat(' limit ?,?');
    params.push((pageIndex-1)*pageSize);
    params.push(pageSize);
    mysql.query(sql1.concat(sql),params,function (err,result) {
       if(err){
           throw err;
       }
       var data={"rel":true,"msg":"获取成功","list":result[1],"count":result[0][0].count};
       res.send(data);
    });
});

/**
 * 查看用户
 */
router.post('/user/view/:id',function (req,res) {
    var sql="select * from user where ?";
    var params={'id':req.params.id};
    mysql.query(sql,params,function (err,result) {
       if (err){
           throw err;
       }
       res.send(result[0]);
    });
});

/**
 * 更新用户
 */
router.post('/user/update',function (req,res) {
   var sql='update user set id=?';
   var params=[req.body.id];
    if(req.body.user_name!=''&&typeof req.body.user_name!='undefined'){
        sql=sql.concat(',user_name=?');
        params.push(req.body.user_name);
    }
    if(req.body.login_name!=''&&typeof req.body.login_name!='undefined'){
        sql=sql.concat(',login_name=?');
        params.push(req.body.login_name);
    }
    if(req.body.password!=''&&typeof req.body.password!='undefined'){
        sql=sql.concat(',password=?');
        params.push(req.body.password);
    }
    if(req.body.role!=''&&typeof req.body.role!='undefined'){
        sql=sql.concat(',role=?');
        params.push(req.body.role);
    }
    if(req.body.sex!=''&&typeof req.body.sex!='undefined'){
        sql=sql.concat(',sex=?');
        params.push(req.body.sex);
    }
    if(req.body.birthday!=''&&typeof req.body.birthday!='undefined'){
        sql=sql.concat(',birthday=?');
        params.push(req.body.birthday);
    }
    if(req.body.age!=''&&typeof req.body.age!='undefined'){
        sql=sql.concat(',age=?');
        params.push(req.body.age);
    }
    if(req.body.phone!=''&&typeof req.body.phone!='undefined'){
        sql=sql.concat(',phone=?');
        params.push(req.body.phone);
    }
    if(req.body.email!=''&&typeof req.body.email!='undefined'){
        sql=sql.concat(',email=?');
        params.push(req.body.email);
    }
    if(req.body.qq!=''&&typeof req.body.qq!='undefined'){
        sql=sql.concat(',qq=?');
        params.push(req.body.qq);
    }
    if(req.body.sign!=''&&typeof req.body.sign!='undefined'){
        sql=sql.concat(',sign=?');
        params.push(req.body.sign);
    }
    if(req.body.personal_note!=''&&typeof req.body.personal_note!='undefined'){
        sql=sql.concat(',personal_note=?');
        params.push(req.body.personal_note);
    }
    if(req.body.personal_logo!=''&&typeof req.body.personal_logo!='undefined'){
        sql=sql.concat(',photo_logo=?');
        params.push(req.body.personal_logo);
    }
    if(req.body.address1!=''&&typeof req.body.address1!='undefined'){
        sql=sql.concat(',address=?');
        params.push(req.body.address1+req.body.address2+req.body.address3);
    }
    sql=sql.concat(' where id=?');
    params.push(req.body.id);
    mysql.query(sql,params,function (err,result) {
       if(err){
           throw err;
       }
    });
});

/**
 * 删除用户
 */
router.post('/user/delete/:id',function (req,res) {
   var sql='delete from user where id=?';
   var params=[req.params.id];
   mysql.query(sql,params,function (err,result) {
      if(err){
          throw err;
      }
      res.send('success');
   });
});

/**
 * 补充用户信息
 */
router.get('/user/edit/:id',function (req,res) {
    var sql='select * from user where id=?';
    var params=[req.params.id];
    mysql.query(sql,params,function(err,result){
        if(err){
            throw err;
        }
        res.render('user/add',{user:result[0]});
    });
});

/**
 * 上传头像
 */
router.post('/user/upload',function(req,res){
    /*var _today=moment().format('YYYYMMDD');
    var filePath='/public/upload/'+_today;//保存到数据库的路径
    var upload_path=path.join(__dirname, '..'+filePath);//保存到本地的路径
    var image_name=uuid.v1()+".jpg";
    fs.exists(upload_path, function(exists) {
        if(!exists) {
            fs.mkdir(upload_path,function (err) {
                if(err){
                    throw err;
                }
            });
        }
    });*/
});

/**
 * 找回密码：判断用户名是否存在
 */
router.post('/user/findUserByLoginName',function(req,res){
    var sql='select id,email FROM user where ?';
    mysql.query(sql,req.body,function(err,result){
        if(err){
            throw err;
        }
        res.send(result[0]);
    });
});

/**
 * 找回密码：获取验证码
 */

router.post('/user/getCode',function(req,res){
    var code='';
    for(var i=0;i<6;i++) {
        code+=Math.floor(Math.random()*10);
    }
    var mailOptions = {
        from:'ruixin.mail@qq.com', //发送者
        to:req.body.email,  //接受者，可以同时发送多个，用逗号隔开
        subject:req.body.subject,//标题
        html:'<h2>ruixin 博客</h2>' +
        '您的验证码为'+code+'，此验证码有效期为30分钟'
    };
    email.send(mailOptions,function (err,result) {
        if(err){
            throw err;
        }
        result.messageCode=code;
        res.send(result)
    });
});
module.exports = router;
