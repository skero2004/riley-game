class Planet extends ImageElement {

    init(background, loadType) {

        super.init(background);
    
        this.appear(0);

        // Randomly choose image
        let images = document.getElementsByClassName("planet");
        let rand = Math.floor(Math.random() * images.length);

        // Set image and scale
        this.setImage(images[rand]);
        this.scaleTo(0, 0.5 + Math.random() * 0.5);

        // Rotate by random number
        this.rotateBy(0, -20 + Math.random() * 40);

        // Set position
        if (loadType == background.loadTypes.FIRST) {

            this.setPosition(

                Math.random() * (this.gameWidth - this.width / 2), 
                this.height / 2 + Math.random() * (this.gameHeight - this.height)
            
            );

        } else {
            
            this.setPosition(

                this.gameWidth + this.width / 2, 
                this.height / 2 + Math.random() * (this.gameHeight - this.height)
            
            );

        }

        // Set necessary properties

        this.background = background;
        
        this.speedTypes = background.speedTypes;

        this.maxSpeed = -50;
        this.normalSpeed = -30;
        this.minSpeed = -20;

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