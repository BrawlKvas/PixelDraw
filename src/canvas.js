class ZonaDraw {
    constructor(option) {
        this.arrDraw = [];

        this.sizePixel = 15;

        this.scal = 1;
        this.maxScal = 4;
        this.minScal = 0.6;

        this.canvas = option.canvas;
        this.ctx = this.canvas.getContext('2d', {alpha: false});

        this.updateSizeCanvas();
        this.resetScreen();

        this.palette = option.palette;

        this.canvas.addEventListener('mousedown', this.eventMouse.bind(this));
        this.canvas.addEventListener('wheel', this.scaling.bind(this));

        window.onresize = this.updateSizeCanvas.bind(this);
        
        this.camera = {
            x: 0,
            y: 0
        }
    }

    updateSizeCanvas() {
        this.w = canvas.width = window.innerWidth * this.scal;
        this.h = canvas.height = window.innerHeight * this.scal;

        this.drawPixels();
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
                this.arrDraw.push({
                    x: Math.floor((x * this.scal - this.camera.x) / this.sizePixel) * this.sizePixel,
                    y: Math.floor((y * this.scal - this.camera.y) / this.sizePixel) * this.sizePixel,
                    color: this.palette.getColor
                });

                this.drawPixels();
            }
            
            document.body.style.cursor = 'auto';
            this.canvas.onmousemove = null;
        }
    }

    scaling(e) {
        if (e.deltaY < 0) {
            if (this.scal > this.minScal) {
                this.scal = +(this.scal - 0.1).toFixed(1);
            }
        } else {
            if (this.scal < this.maxScal) {
                this.scal = +(this.scal + 0.1).toFixed(1);
            }
        }
        
        this.updateSizeCanvas();
        this.drawPixels();
    }

    drawPixels() {
        this.resetScreen();
        this.arrDraw.forEach(item => {
            this.ctx.fillStyle = item.color;
            this.ctx.fillRect(item.x + this.camera.x, item.y + this.camera.y, this.sizePixel, this.sizePixel);
        });
    }

    resetScreen() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.w, this.h);
    }
}

export default ZonaDraw;