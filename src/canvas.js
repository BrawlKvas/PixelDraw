class ZonaDraw {
    constructor(option) {
        this.socket = option.socket;
        this.arrDraw = [];

        this.sizePixel = 15;

        this.canvas = option.canvas;
        this.ctx = this.canvas.getContext('2d', {alpha: false});

        this.updateSizeCanvas();
        this.resetScreen();

        this.palette = option.palette;

        this.bgc = '#000000';

        this.canvas.addEventListener('mousedown', this.eventMouse.bind(this));
        // this.canvas.addEventListener('wheel', this.scaling.bind(this));

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
        this.w = canvas.width = window.innerWidth;
        this.h = canvas.height = window.innerHeight;

        this.drawPixels();
    }

    uploadToServer() {
        this.socket.emit('uploadToServer', this.arrDraw);
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

        this.canvas.onmousemove = (event) => {
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

        this.canvas.onmouseup = (event) => {
            if (click) {
                x = Math.floor((x - this.camera.x) / this.sizePixel) * this.sizePixel;
                y = Math.floor((y - this.camera.y) / this.sizePixel) * this.sizePixel;

                this.deletePixel(x, y);

                this.arrDraw.push({
                    x,
                    y,
                    color: this.palette.getColor
                });

                this.uploadToServer();
            }
            
            document.body.style.cursor = 'auto';
            this.canvas.onmousemove = null;
        }
    }
    

    // scaling(e) {}

    drawPixels() {
        this.resetScreen();
        this.arrDraw.forEach(item => {
            this.ctx.fillStyle = item.color;
            this.ctx.fillRect(item.x + this.camera.x, item.y + this.camera.y, this.sizePixel, this.sizePixel);
        });
    }

    resetScreen() {
        this.ctx.fillStyle = this.bgc;
        this.ctx.fillRect(0, 0, this.w, this.h);
    }
}

export default ZonaDraw;