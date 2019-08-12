CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    var min_size = Math.min(w, h);
    if (r > min_size / 2) r = min_size / 2;
    // 开始绘制
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}


class Jigsaw {
    constructor(imgEl, width, height) {

        this.imgEl = imgEl;
        this.bgColor = "#ffffff";

        var canvas = this.canvas = document.createElement('canvas');
        canvas.width = width || 375 * 2;
        canvas.height = height || document.body.offsetHeight * 2;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        this.context = canvas.getContext("2d");

        this.drawQueue = [];

        var dataURL = this.canvas.toDataURL('image/jpeg');
        this.imgEl.src = dataURL;

        this.setBgColor(this.bgColor);
    }

    fillText(text, style) {
        style = style || {};
        var timeTag = Date.now() + '-' + parseInt((Math.random() + 1) * 1000);
        this.subDraw(timeTag);

        this.pubDraw(timeTag, {
            type: 'TEXT',
            text: text,
            x: style.x || 0,
            y: style.y || 0,
            fontSize: style.fontSize || '12px',
            color: style.color,
            center: style.center || false
        })
    }

    drawImage(imgUrl, style) {
        var img = new Image();
        img.src = imgUrl;

        style = style || {};
        var center = style.center;
        var timeTag = Date.now() + '-' + parseInt((Math.random() + 1) * 1000);
        this.subDraw(timeTag);

        img.onload = function() {
            var width = style.width || img.width;
            var height = style.height || (img.height/img.width * width);
            var centerX = 0;

            if (center) {
                var centerX = this.canvas.width / 2 - width / 2;
            }

            this.pubDraw(timeTag, {
                type: 'IMAGE',
                img: img, 
                x: centerX || style.x || 0,
                y: style.y || 0,
                width: width,
                height: height
            })
            
        }.bind(this);
    }

    drawCircleImage(imgUrl, style) {
        var img = new Image(), context = this.context;
        img.src = imgUrl;
        var style = style || {};

        var timeTag = Date.now() + '-' + parseInt((Math.random() + 1) * 1000);
        this.subDraw(timeTag);
        
        img.onload = function() {
            
            var centerX;

            if (style.center) {
                centerX = this.canvas.width / 2 ;
            }

            var r = style.r || Math.min(img.width, img.height) / 2;

            this.pubDraw(timeTag, {
                type: 'CIRCLE_IMAGE',
                img: img,
                x: centerX || r + style.x || img.width / 2,
                y: r + style.y || img.height / 2,
                r: style.r || Math.min(img.width, img.height) / 2
            });

        }.bind(this)
    }

    fillRect(style) {
        var style = style || {};
        var width = style.width || 0;
        var height = style.height || 0;

        var timeTag = Date.now() + '-' + parseInt((Math.random() + 1) * 1000);
        this.subDraw(timeTag)

        var centerX;

        if (style.center) {
            centerX = this.canvas.width / 2 - width / 2 ;
        }

        this.pubDraw(timeTag, {
            type: 'RECT',
            width: width,
            height: height,
            x: centerX || style.x || 0,
            y: style.y || 0,
            color: style.color || 'black'
        })
    }

    drawCircle(style) {
        var style = style || {};

        var timeTag = Date.now() + '-' + parseInt((Math.random() + 1) * 1000);
        this.subDraw(timeTag)

        var centerX;
        if (style.center) {
            centerX = this.canvas.width / 2;
        }

        this.pubDraw(timeTag, {
            type: 'CIRCLE',
            x: centerX || style.x + style.r || style.r || 0,
            y: style.y + style.r || style.r || 0,
            r: style.r,
            color: style.color || '#fff',
            lineWidth: style.lineWidth || 2
        })
    }

    setBgColor(color) {
        this.bgColor = color;
        this.fillRect({
            width: this.canvas.width,
            height: this.canvas.height,
            color: this.bgColor
        });
    }

    subDraw(tag) {
        var drawOpt = null;
        this.drawQueue.push({
            tag: tag,
            drawOpt: null
        });
    }

    pubDraw(tag, drawOpt) {

        this.drawQueue.forEach(item => {
            
            if (item.tag == tag) {
                item.drawOpt = drawOpt;
            }
        })

        this.runDraw();
        
    }

    runDraw() {
        
        while(this.drawQueue[0] && this.drawQueue[0].drawOpt) {
            var drawOpt = this.drawQueue[0].drawOpt;

            if (drawOpt.type == 'IMAGE') {
                this.context.drawImage(drawOpt.img, drawOpt.x, drawOpt.y, drawOpt.width, drawOpt.height);
            } else if (drawOpt.type == 'TEXT') {
                var fontFamily = drawOpt.fontFamily || 'Arial';
                this.context.font = drawOpt.fontSize + ' ' + fontFamily;
                this.context.fillStyle = drawOpt.color || 'black';

                if (drawOpt.center) {
                    this.context.textAlign = 'center';
                    this.context.fillText(drawOpt.text, this.canvas.width / 2, drawOpt.y);
                } else {
                    this.context.fillText(drawOpt.text, drawOpt.x, drawOpt.y);
                }

            } else if (drawOpt.type == 'CIRCLE_IMAGE') {
                // 创建图片纹理
                var pattern = this.context.createPattern(drawOpt.img, "no-repeat");
                // 如果要绘制一个圆，使用下面代码
                this.context.arc(drawOpt.x , drawOpt.y , drawOpt.r, 0, 2 * Math.PI);
                
                // this.context.roundRect(0, 0, drawOpt.img.width, drawOpt.img.width, 10000 * 1 || 0);
                // 填充绘制的圆
                var scaleN = drawOpt.r / (Math.min(drawOpt.img.height, drawOpt.img.width) / 2);
                this.context.setTransform(scaleN,0,0,scaleN,drawOpt.x - drawOpt.r,drawOpt.y - drawOpt.r);
                this.context.fillStyle = pattern;
                this.context.fill();
                this.context.setTransform(1,0,0,1,0,0);
            } else if (drawOpt.type == 'RECT') {
                this.context.fillStyle = drawOpt.color;
                this.context.fillRect(drawOpt.x, drawOpt.y, drawOpt.width, drawOpt.height)
            } else if (drawOpt.type == 'CIRCLE') {
                this.context.beginPath();
                this.context.lineWidth = drawOpt.lineWidth;
                this.context.strokeStyle = drawOpt.color;
                this.context.arc(drawOpt.x,drawOpt.y,drawOpt.r,0,2 * Math.PI);
                this.context.stroke();
            }

            var dataURL = this.canvas.toDataURL('image/jpeg');
            this.imgEl.src = dataURL;
            this.drawQueue.shift();
        }
    }

    
    
}

export default Jigsaw;