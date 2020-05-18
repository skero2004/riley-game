class Star {

    constructor(background) {

        this.gameWidth = background.gameWidth;
        this.gameHeight = background.gameHeight;

        this.image = document.getElementById("star");
        this.scale = 0.5 + Math.random() * 0.5;

        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        this.position = {

            x: this.gameWidth + this.width / 2,
            y: Math.random() * this.gameHeight

        }

        this.rotateAngle = Math.random() * Math.PI / 2;

    }

    update(deltaTime) {

        this.position.x -= 100 * deltaTime / 256;

    }

    draw(ctx) {

        // Translate so the center is origin
        ctx.translate(this.position.x, this.position.y);

        // Rotate image
        ctx.rotate(this.rotateAngle);

        // Draw the image
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

    }

}