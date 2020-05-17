class Planet {

    constructor(background) {

        this.gameWidth = background.gameWidth;
        this.gameHeight = background.gameHeight;
        
        this.maxSpeed = -40;
        this.normalSpeed = -30;
        this.minSpeed = -20;

        this.speedTypes = background.speedTypes;

    }

    setRandomImage() {

        // Randomly choose image
        let rand = Math.ceil(Math.random() * 5);
        let image;
        if (rand == 1)
            image = "chrysalis";
        else if (rand == 2)
            image = "diginet";
        else if (rand == 3)
            image = "frostburg";
        else if (rand == 4)
            image = "mizar";
        else
            image = "primus";

        this.image = document.getElementById(image);

        // Scale down the image by some percent
        this.scale = 0.5 + Math.random() * 0.5;

        // Set scaled down image width and height
        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        // Rotate 0 ~ 45 degrees
        this.rotateAngle = Math.random() * Math.PI / 4;

    }

    setFirstPosition() {

        this.position = {

            x: Math.random() * (this.gameWidth - this.width / 2),
            y: Math.random() * (this.gameHeight - this.height / 2)

        }

    }

    setPosition() {

        this.position = {

            x: this.gameWidth + this.width / 2,
            y: Math.random() * (this.gameHeight - this.height / 2)

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

        this.position.x += speed / deltaTime;

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