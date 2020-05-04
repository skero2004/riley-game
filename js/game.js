class Game {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

    }

    start() {

        // Objects
        this.player = new Player(this);

        // Input handler
        this.inputs = new InputHandler(this);
        
    }

    update(deltaTime) {

        this.player.update(deltaTime);
        
        this.inputs.update(this);

    }

    draw(ctx) {

        this.player.draw(ctx);

    }

}