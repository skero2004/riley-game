class Game {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

    }

    start(background) {

        // Get background
        this.background = background;

        // Create goal line
        this.goalLine = new GoalLine();

        // Create opponents
        this.opponents = [
            
            new Opponent(),
            new Opponent(),
            new Opponent(),
            new Opponent()
        
        ];

        // Create player
        this.player = new Player();

        // Create equation
        this.equation = new Equation();
        this.equation.makeEquation();

        // Create timer
        this.timer = new Timer();

        // Create input handler
        this.inputs = new InputHandler();

        // Initialize goalLine
        this.goalLine.init(this);

        // Initialize opponents
        this.opponents[0].init(this, 75, "andy");
        this.opponents[1].init(this, 175, "mannie");
        this.opponents[2].init(this, 375, "sammy");
        this.opponents[3].init(this, 475, "winnie");

        // Shuffle opponents array
        for (let i = this.opponents.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [this.opponents[i], this.opponents[j]] = [this.opponents[j], this.opponents[i]];
        
        }

        // Initilize player
        this.player.init(this);

        // Initialize equation
        this.equation.init(this);

        // Initialize timer
        this.timer.init();

        // Initialize input handler
        this.inputs.init(this);
        
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

        // Update timer
        this.timer.update(timeStamp);

        // Update goal line
        this.goalLine.update(deltaTime);

        // Update inputs
        this.inputs.update(this);

    }

    draw(ctx) {

        // Draw goal line
        this.goalLine.draw(ctx);

        // Draw player
        this.player.draw(ctx);
    
        // Draw opponent
        this.opponents.forEach(opponent => {

            opponent.draw(ctx);

        });

        // Draw equation
        this.equation.draw(ctx);

        // Draw timer
        this.timer.draw(ctx);

    }

}