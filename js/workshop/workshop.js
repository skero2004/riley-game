class Workshop {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.secondsToAppear = 0.5;
        this.secondsToDisappear = 0.5;
        
        this.screen = new WorkshopScreen();

        this.fireSound = new Sound("Move.wav");
        this.fireSound.setDefaultVolume(0.07);

    }

    init() {

        this.screen.init(this);

    }

    appear() {

        this.fireSound.play();
        this.screen.appear();

    }

    disappear() {

        this.fireSound.play();
        this.screen.disappear();

    }

    update() {

        this.fireSound.update();
        this.screen.update();

    }
    
    draw(ctx) {

        // Clear canvas
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        this.screen.draw(ctx);

        // Set visibility
        ctx.globalAlpha = this.screen.alpha;

        // Translate so the center of the image is (x,y)
        ctx.translate(this.screen.position.x, this.screen.position.y);

        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        ctx.font = "30px SpaceAge";
        ctx.fillText("Click outside to go back", 0, 225);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Reset visibility
        ctx.globalAlpha = 1;
        
    }

}