function shape(copy,cobj,xp) {
    this.copy=copy;
    this.cobj=cobj;
    this.xp=xp;
    this.canvasW=copy.offsetWidth;
    this.canvasH=copy.offsetHeight;
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.type="line";
    this.style="stroke";
    this.history=[];
    this.biannum=5;
    this.jiaonum=5;
    this.xpsize=10;
    this.isback=true;
}
shape.prototype={
    init:function () {
        this.cobj.fillStyle=this.fillStyle;
            this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
        this.xp.style.display="none";
    },
    draw:function () {
        var that=this;
        that.copy.onmousedown=function(e){
            that.init();
            var startx=e.offsetX;
            var starty=e.offsetY;
            that.copy.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.canvasW,that.canvasH);
                if (that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0)
                }
              var endx=e.offsetX;
              var endy=e.offsetY;
                that[that.type](startx,starty,endx,endy)
            };
                that.copy.onmouseup=function(){
                 that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH))
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                }
        }
    },
   pen:function () {
       var that=this;
       that.copy.onmousedown=function(e){
           that.init();
           var startx=e.offsetX;
           var starty=e.offsetY;
           that.cobj.beginPath();
           that.cobj.moveTo(startx,starty);
           that.copy.onmousemove=function(e){
               var endx=e.offsetX;
               var endy=e.offsetY;
               that.cobj.lineTo(endx,endy);
               that.cobj.stroke();
           };
           that.copy.onmouseup=function(e){
               that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH))
               that.copy.onmousemove=null;
               that.copy.onmouseup=null;
           }
       }
  },
    line:function (x,y,x1,y1) {
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    arc:function (x,y,x1,y1) {
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    rect:function (x,y,x1,y1) {
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
    },
    bian:function (x,y,x1,y1) {
        var angle=360/this.biannum*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        for (var i=0;i<this.biannum;i++){
            this.cobj.lineTo(x+r*Math.cos(angle*i),y+r*Math.sin(angle*i));
        };
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function (x,y,x1,y1) {
        var angle=360/(this.jiaonum*2)*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        this.cobj.beginPath();
        for (var i=0;i<this.jiaonum*2;i++){
            if(i%2==0){
                this.cobj.lineTo(x+r*Math.cos(angle*i),y+r*Math.sin(angle*i));
            }else{
                this.cobj.lineTo(x+r1*Math.cos(angle*i),y+r1*Math.sin(angle*i));
            }
        };
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    clear:function () {
        var that=this;
        that.copy.onmousemove=function(e){
            var endx=e.offsetX;
            var endy=e.offsetY;
            var left=endx-that.xpsize/2;
            var top=endy-that.xpsize/2;
            if(left<0){
                left=0
            };
            if(left>that.canvasW-that.xpsize){
                left=that.canvasW-that.xpsize
            }
            if(top<0){
                top=0
            };
            if(top>that.canvasH-that.xpsize){
                top=that.canvasH-that.xpsize
            };
            that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";
        };
        that.copy.onmousedown=function(){
            that.copy.onmousemove=function(e) {
                var endx = e.offsetX;
                var endy = e.offsetY;
                var left = endx - that.xpsize / 2;
                var top = endy - that.xpsize / 2;
                if (left < 0) {
                    left = 0
                }
                if (left > that.canvasW - that.xpsize) {
                    left = that.canvasW - that.xpsize
                }
                if (top < 0) {
                    top = 0
                }
                if (top > that.canvasH - that.xpsize) {
                    top = that.canvasH - that.xpsize
                }
                that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";
                that.cobj.clearRect(left, top, that.xpsize, that.xpsize);
            };
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasW,that.canvasH));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.clear();
            }
        }
    }
};