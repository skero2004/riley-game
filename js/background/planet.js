class Planet {

    init(background, loadType) {

        this.background = background;

        this.gameWidth = background.gameWidth;
        this.gameHeight = background.gameHeight;
        
        this.speedTypes = background.speedTypes;

        // Set speed
        this.maxSpeed = -50;
        this.normalSpeed = -30;
        this.minSpeed = -20;
    
        this.setRandomImage();

        if (loadType == background.loadTypes.FIRST)
            this.setFirstPosition();
        else 
            this.setPosition();

    }

    setRandomImage() {

        // Randomly choose image
        let images = document.getElementsByClassName("planet");
        let rand = Math.floor(Math.random() * images.length);
        this.image = images[rand];

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
            y: this.height / 2 + Math.random() * (this.gameHeight - this.height)

        }

    }

    setPosition() {

        this.position = {

            x: this.gameWidth + this.width / 2,
            y: this.height / 2 + Math.random() * (this.gameHeight - this.height)

        }

    }

    update(deltaTime) {

        if (this.background.speed == this.speedTypes.FAST)
            this.speed = this.maxSpeed;
        else if (this.background.speed == this.speedTypes.NORMAL)
            this.speed = this.normalSpeed;
        else 
            this.speed = this.minSpeed;

        this.position.x += this.speed * deltaTime / speedThreshold;

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