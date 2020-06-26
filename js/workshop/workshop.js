class Workshop {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.secondsToAppear = 0.5;
        this.secondsToDisappear = 0.5;
        
        this.screen = new WorkshopScreen();

    }

    init() {

        this.screen.init(this);

    }

    appear() {

        this.screen.appear();

    }

    disappear() {

        this.screen.disappear();

    }

    update() {

        this.screen.update();

    }
    
    draw(ctx) {

        // Clear canvas
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        this.screen.draw(ctx);
        
    }

}