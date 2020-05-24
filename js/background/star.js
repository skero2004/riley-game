class Star {

    init(background, loadType) {

        this.background = background;

        this.player = background.player;

        this.gameWidth = background.gameWidth;
        this.gameHeight = background.gameHeight;

        this.image = document.getElementById("star");
        this.scale = 0.3 + Math.random() * 0.3;

        this.width = this.image.width * this.scale;
        this.height = this.image.height * this.scale;

        this.speedTypes = background.speedTypes;

        // Set speed
        this.maxSpeed = -120;
        this.normalSpeed = -80;
        this.minSpeed = -60;
        if (this.background.speed == this.speedTypes.FAST)
            this.speed = this.maxSpeed;
        else if (this.background.speed == this.speedTypes.NORMAL)
            this.speed = this.normalSpeed;
        else 
            this.speed = this.minSpeed;

        this.rotateAngle = Math.random() * Math.PI / 2;

        if (loadType == background.loadTypes.FIRST)
            this.setFirstPosition();
        else
            this.setPosition();

    }

    setFirstPosition() {

        this.position = {

            x: Math.random() * this.gameWidth * 2,
            y: this.height / 2 + Math.random() * (this.gameHeight - this.height)

        }

    }

    setPosition() {

        this.position = {

            x: this.gameWidth * 2,
            y: this.height / 2 + Math.random() * (this.gameHeight - this.height)

        }

    }

    update(deltaTime) {

        if (!this.player.isGoalLineCrossed) {

            if (this.background.speed == this.speedTypes.FAST)
                this.speed = this.maxSpeed;
            else if (this.background.speed == this.speedTypes.NORMAL)
                this.speed = this.normalSpeed;
            else 
                this.speed = this.minSpeed;

        }

        // If the dampening is not complete, continue to dampen. Else, stop
        if (this.speed + this.background.dampener < 0)
            this.position.x += (this.speed + this.background.dampener) * deltaTime / speedThreshold;
        else
            this.position.x += 0;

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