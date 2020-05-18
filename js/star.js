class Star {

    constructor(background) {

        this.gameWidth = background.gameWidth;
        this.gameHeight = background.gameHeight;

        this.image = document.getElementById("star");
        this.scale = 0.3 + Math.random() * 0.3;

        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        this.position = {

            x: this.gameWidth + this.width / 2,
            y: Math.random() * this.gameHeight

        }

        this.speedTypes = background.speedTypes;

        this.maxSpeed = -120;
        this.normalSpeed = -80;
        this.minSpeed = -60;

        this.rotateAngle = Math.random() * Math.PI / 2;

    }

    setFirstPosition() {

        this.position = {

            x: this.width / 2 + Math.random() * (this.gameWidth - this.width),
            y: this.height / 2 + Math.random() * (this.gameHeight - this.height)

        }

    }

    setPosition() {

        this.position = {

            x: this.gameWidth + this.width / 2,
            y: this.height / 2 + Math.random() * (this.gameHeight - this.height)

        }

    }

    update(deltaTime, speedType) {

        let speed;
        if (speedType == this.speedTypes.FAST)
            speed = this.maxSpeed;
        else if (speedType == this.speedTypes.NORMAL)
            speed = this.normalSpeed;
        else 
            speed = this.minSpeed;

        this.position.x += speed * deltaTime / speedThreshold;

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