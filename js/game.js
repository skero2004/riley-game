class Game {

    constructor(gameWidth, gameHeight, background) {

        // Get background
        this.background = background;

        // Set width and height
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

    }

    start() {

        this.gameDuration = 60000;

        // Create opponents
        this.opponents = [
            
            new Opponent(this, 75),
            new Opponent(this, 175),
            new Opponent(this, 375),
            new Opponent(this, 475)
        
        ];

        // Shuffle opponents array
        for (let i = this.opponents.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [this.opponents[i], this.opponents[j]] = [this.opponents[j], this.opponents[i]];
        
        }

        // Set the images (random since it's shuffled)
        this.opponents[0].setImage("andy");
        this.opponents[1].setImage("mannie");
        this.opponents[2].setImage("sammy");
        this.opponents[3].setImage("winnie");

        // Create player
        this.player = new Player(this);

        // Create equation
        this.equation = new Equation(this);
        this.equation.makeEquation();

        // Input handler
        this.inputs = new InputHandler(this);
        
    }

    update(deltaTime, timeStamp) {

        // Update player
        this.player.update(deltaTime);

        // Update opponents
        this.opponents.forEach(opponent => {
            
            opponent.update(deltaTime, timeStamp);

        });

        // Update equation
        this.equation.update();

        // Update inputs
        this.inputs.update(this);

    }

    draw(ctx) {

        // Draw player
        this.player.draw(ctx);
    
        // Draw opponent
        this.opponents.forEach(opponent => {

            opponent.draw(ctx);

        });

        // Draw equation
        this.equation.draw(ctx);

    }

}