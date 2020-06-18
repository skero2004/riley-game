class ImageElement extends GameElement {

    init(canvas) {

        super.init(canvas);

    }

    setImage(image) {

        this.image = image;
        this.width = this.image.width;
        this.height = this.image.height;

    }

    scaleBy(seconds, scale) {

        this.scaleTo(seconds, this.scale * scale);

    }

    scaleTo(seconds, scale) {

        const scaleFactor = scale - this.scale;

        // Necessary calculations
        const fps = 60;
        const framesInInterval = fps * seconds;
        const interval = setInterval(() => {

            // Scale by a little
            if (seconds) this.scale += scaleFactor / framesInInterval;
            else this.scale = scale;

            if ((scaleFactor < 0 && this.scale <= scale) || 
                (scaleFactor > 0 && this.scale >= scale) || 
                (scaleFactor == 0)) {

                this.scale = scale;
                clearInterval(interval);
            
            }
    
        }, 1000 / fps);

    }

    update() {

        // Scale image
        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        // Update border positions
        this.left = this.position.x - this.width / 2;
        this.right = this.position.x + this.width / 2;
        this.top = this.position.y - this.height / 2;
        this.bottom = this.position.y + this.height / 2;

        super.update();

    }

    draw(ctx) {

        // If it is visible, then draw
        if (this.alpha > 0) {

            // Set visibility
            ctx.globalAlpha = this.alpha;

            // Translate so the center of the image is (x,y)
            ctx.translate(this.position.x, this.position.y);

            // Rotate
            ctx.rotate(this.angle * Math.PI / 180);

            // Draw the image
            if (this.width == this.image.width) // Not scaled
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2);
            else // Scaled
                ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

            // Reset transform
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            // Reset visibility
            ctx.globalAlpha = 1;

        }

    }

}