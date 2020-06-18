class Star extends ImageElement {

    init(background, loadType) {

        super.init(background);

        this.appear(0);

        this.setImage(document.getElementById("star"));
        this.scaleTo(0, 0.3 + Math.random() * 0.3);

        this.rotateBy(0, Math.random() * 90);

        // Set position
        if (loadType == background.loadTypes.FIRST) {

            this.setPosition(

                Math.random() * (this.gameWidth - this.width / 2),
                this.height / 2 + Math.random() * (this.gameHeight - this.height)

            )

        } else {

            this.setPosition(

                this.gameWidth + this.width / 2,
                this.height / 2 + Math.random() * (this.gameHeight - this.height)

            )

        }

        // Necessary properties

        this.background = background;

        this.speedTypes = background.speedTypes;
        this.maxSpeed = -120;
        this.normalSpeed = -80;
        this.minSpeed = -60;

    }

    update(deltaTime) {

        if (this.background.speed == this.speedTypes.FAST)
            this.speed = this.maxSpeed;
        else if (this.background.speed == this.speedTypes.NORMAL)
            this.speed = this.normalSpeed;
        else 
            this.speed = this.minSpeed;

        this.position.x += this.speed * deltaTime / speedThreshold;

        super.update();

    }

}