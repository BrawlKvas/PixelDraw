class ZonaDraw {
    constructor(option) {
        this.socket = option.socket;
        this.arrDraw = [];

        this.sizePixel = 15;

        this.canvas = option.canvas;
        this.ctx = this.canvas.getContext('2d', { alpha: false });

        this.canvasUp = option.canvasUp;
        this.ctxUp = this.canvasUp.getContext('2d');

        this.updateSizeCanvas();
        this.resetScreen();

        this.palette = option.palette;

        this.bgc = '#000000';

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.canvasUp.addEventListener('touchstart', this.eventTouch.bind(this), false);
        } else {
            this.coordinatePanel = option.coordinatePanel;
            document.addEventListener('mousemove', this.initCoordinate.bind(this));
            this.canvasUp.addEventListener('mousedown', this.eventMouse.bind(this));
        }
    
        window.onresize = this.updateSizeCanvas.bind(this);

        this.camera = {
            x: 0,
            y: 0
        }

        this.socket.on('uploadToClient', (data) => {
            this.arrDraw = data.data;

            this.drawPixels();
        });
    }

    updateSizeCanvas() {
        this.w = this.canvas.width = this.canvasUp.width = window.innerWidth;
        this.h = this.canvas.height = this.canvasUp.height = window.innerHeight;

        this.drawPixels();
    }

    addPixel(pixel) {
        this.socket.emit('addPixel', pixel);
    }

    deletePixel(x, y) {
        this.arrDraw = this.arrDraw.filter(item => {
            return !(item.x == x && item.y == y) && item.color != this.bgc;
        });
    }

    eventMouse(e) {
        let x = e.clientX;
        let y = e.clientY;

        let click = true;

        let lastX = x;
        let lastY = y;

        this.canvasUp.onmousemove = (event) => {
            if (Math.abs(x - event.clientX) > 8 || Math.abs(y - event.clientY) > 8) {
                document.body.style.cursor = 'move';
                click = false;

                this.camera.x += event.clientX - lastX;
                this.camera.y += event.clientY - lastY;

                lastX = event.clientX;
                lastY = event.clientY;

                this.drawPixels();

            }
        }

        this.canvasUp.onmouseup = (event) => {
            if (click) {
                x = Math.floor((x - this.camera.x) / this.sizePixel) * this.sizePixel;
                y = Math.floor((y - this.camera.y) / this.sizePixel) * this.sizePixel;

                this.addPixel({
                    x,
                    y,
                    color: this.palette.getColor
                    
                });
            }

            document.body.style.cursor = 'auto';
            this.canvasUp.onmousemove = null;
        }
    }

    eventTouch(e) {
        e.stopPropagation();

        let x = e.targetTouches[0].pageX;
        let y = e.targetTouches[0].pageY;

        let click = true;

        let lastX = x;
        let lastY = y;

        this.canvasUp.ontouchmove = (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (Math.abs(x - event.targetTouches[0].pageX) > 8 || Math.abs(y - event.targetTouches[0].pageY) > 8) {
        
                click = false;

                this.camera.x += event.targetTouches[0].pageX - lastX;
                this.camera.y += event.targetTouches[0].pageY - lastY;

                lastX = event.targetTouches[0].pageX;
                lastY = event.targetTouches[0].pageY;

                this.drawPixels();

            }
        }

        this.canvasUp.ontouchend = (event) => {
            event.stopPropagation();

            if (click) {
                x = Math.floor((x - this.camera.x) / this.sizePixel) * this.sizePixel;
                y = Math.floor((y - this.camera.y) / this.sizePixel) * this.sizePixel;

                this.addPixel({
                    x,
                    y,
                    color: this.palette.getColor
                    
                });
            }

            this.canvasUp.ontouchmove = null;
        }
    }

    initCoordinate(e) {
        this.coordinatePanel.innerHTML = `X:${e.clientX - this.camera.x} Y:${e.clientY - this.camera.y}`;

        this.strokePixel(e.clientX, e.clientY);
    }

    strokePixel(x, y) {
        this.ctxUp.clearRect(0, 0, this.w, this.h);
        this.ctxUp.strokeStyle = 'white';
        this.ctxUp.lineWidth = 2;
        this.ctxUp.strokeRect(Math.floor((x - this.camera.x) / this.sizePixel) * this.sizePixel + this.camera.x, Math.floor((y - this.camera.y) / this.sizePixel) * this.sizePixel + this.camera.y, this.sizePixel, this.sizePixel);
    }

    drawPixels() {
        this.resetScreen();
        this.arrDraw.forEach(item => {
            this.ctx.fillStyle = item.color;
            this.ctx.fillRect(Math.floor(item.x + this.camera.x), Math.floor(item.y + this.camera.y), this.sizePixel, this.sizePixel);
        });
    }

    resetScreen() {
        this.ctx.fillStyle = this.bgc;
        this.ctx.fillRect(0, 0, this.w, this.h);
    }
}

export default ZonaDraw;