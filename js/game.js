class Game {

    constructor(gameWidth, gameHeight) {

        // Set width and height
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

    }

    start() {

        // Create opponents
        this.opponents = [
            
            new Opponent(this, 25),
            new Opponent(this, 125),
            new Opponent(this, 325),
            new Opponent(this, 425)
        
        ];

        // Set opponent images

        // Shuffle array
        for (let i = this.opponents.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [this.opponents[i], this.opponents[j]] = [this.opponents[j], this.opponents[i]];
        
        }

        this.opponents[0].setImage("sammy");

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