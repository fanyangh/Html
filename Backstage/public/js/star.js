
    var w = document.documentElement.clientWidth*1.2;
    var h = document.documentElement.clientHeight*1.2;
    var star = document.getElementsByClassName("stars")[0];
    var n = 10000;//数量
    //随机函数
    function randomNum(m, n) {
        return Math.floor(Math.random() * (n - m + 1) + m);
    }

    var str = '';
    for (var i = 0; i < n; i++) {
        var numX = randomNum(-w, w);
        var numY = randomNum(-h, h);
        var color = 'rgb(' + randomNum(0, 255) + ',' + randomNum(0, 255) + ',' + randomNum(0, 255) + ')';
        str += numX +'px'+' ' + numY+'px'+' '+ color+',';
    }
    str = str.slice(0,-1);
    star.style.boxShadow =  str;


            $(function(){

                  $('#main').fadeOut();

                  $('#main').fadeIn('slow');

        })