class Planet {

    init(background, loadType) {

        this.background = background;

        this.player = background.player;

        this.gameWidth = background.gameWidth;
        this.gameHeight = background.gameHeight;
        
        this.maxSpeed = -50;
        this.normalSpeed = -30;
        this.minSpeed = -20;
        this.speed = this.normalSpeed;

        this.speedTypes = background.speedTypes;

        this.setRandomImage();

        if (loadType == background.loadTypes.FIRST)
            this.setFirstPosition();
        else 
            this.setPosition();

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

            x: Math.random() * (this.gameWidth + 150),
            y: this.height / 2 + Math.random() * (this.gameHeight - this.height)

        }

    }

    setPosition() {

        this.position = {

            x: this.gameWidth + 150,
            y: this.height / 2 + Math.random() * (this.gameHeight - this.height)

        }

    }

    stop() {

        if (this.speed < 0)
            this.speed += 1;
        else
            this.speed = 0;
        console.log(this.speed);

    }

    update(deltaTime) {

        if (!this.player.isGoalLineCrossed) {

            if (this.background.speed == this.speedTypes.FAST)
                this.speed = this.maxSpeed;
            else if (this.background.speed == this.speedTypes.NORMAL)
                this.speed = this.normalSpeed;
            else 
                this.speed = this.minSpeed;

        } else {

            this.stop();

        }

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