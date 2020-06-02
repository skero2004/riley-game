class Item {        

    init(image) {

        this.position = {

            x: -200,
            y: 160

        }

        this.image = image;
        
        this.scale = 0;
        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        this.startAngle = Math.PI;
        this.angle = this.startAngle;

        this.alpha = 0;

        this.name = image.src.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "").replace(/([A-Z])/g, ' $1').trim();

    }

    appear() {

        const fps = 60;
        const secondsToAppear = 1.5;
        const framesInInterval = fps * secondsToAppear;
        let interval = setInterval(() => {

            // Scale up by a little
            this.scale += 1 / framesInInterval;
            this.width = this.image.width * this.scale;
            this.height = this.image.height * this.scale;

            // Turns by a little
            this.angle -= this.startAngle / framesInInterval;

            // Increase alpha by a little
            this.alpha += 1 / framesInInterval;
            if (this.angle < 0) {

                this.scale = 1;
                this.width = this.image.width * this.scale;
                this.height = this.image.height * this.scale;

                this.angle = 0;
                this.alpha = 1;
                clearInterval(interval);

            }

        }, 1 / fps);

    }

    storeItem() {



    }

    draw(ctx) {

        // Set opacity of the image
        ctx.globalAlpha = this.alpha;

        // Translate so the center is origin
        ctx.translate(this.position.x, this.position.y);

        // Rotate
        ctx.rotate(this.angle);

        // Draw the image
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

    }

}