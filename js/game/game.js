class Game {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        // Create goal line
        this.goalLine = new GoalLine();

        // Create results screen
        this.results = new Results();

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

        // Create timer
        this.timer = new Timer();

        // Create input handler
        this.inputs = new InputHandler();

    }

    init(background) {

        // Get background
        this.background = background;

        // Boolean to check if game is running
        this.isGame = true;
        this.gameCheck = 0;
        this.justFinish = false;

        // Initialize goalLine
        this.goalLine.init(this);

        // Initialize results screen
        this.results.init(this);

        // Set images to an array of images (rather than HTML collection)
        const tempImages = document.getElementsByClassName("opponent");
        let images = [];
        for (let i = 0; i < tempImages.length; i++) {

            images.push(tempImages[i]);

        }

        // Shuffle images
        for (let i = images.length - 1; i > 0; i--) {
            
            const j = Math.floor(Math.random() * (i + 1));
            const temp = images[i];
            images[i] = images[j];
            images[j] = temp;
        
        }

        // Initialize opponents
        this.opponents[0].init(this, 75, images[0]);
        this.opponents[1].init(this, 175, images[1]);
        this.opponents[2].init(this, 375, images[2]);
        this.opponents[3].init(this, 475, images[3]);

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

        // Update result screen
        this.results.update();

        // Update inputs
        this.inputs.update();

        // Check if player passed the goal line
        if (this.player.position.x > this.goalLine.position.x) {

            this.isGame = false;
            this.gameCheck++;

        }

        // Set justFinish to true the moment the player crosses the goal line
        if (this.gameCheck == 1)
            this.justFinish = true;
        else
            this.justFinish = false;

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

        // Draw results
        this.results.draw(ctx);

    }

}