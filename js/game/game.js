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

        // Create countdown
        this.countdown = new Countdown();
        
        // Difficulty settings
        this.difficulty = "medium";

        // Used operations
        this.usedOperations = "+-";

    }

    init(background) {

        this.startTime = 0;

        this.isGame = true;
        this.isStart = false;

        // Get background
        this.background = background;

        // Boolean to check if game is running
        this.gameCheck = 0;
        this.justFinish = false;

        // Initialize goalLine
        this.goalLine.init(this);

        // Initialize results screen
        this.results.init(this);

        // Initialize countdown
        this.countdown.init(this);

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
        this.timer.init(this);
        
        // Make game elements appear
        this.appear();

    }

    setDifficulty(difficulty) {

        this.difficulty = difficulty;

    }

    appear() {

        this.player.appear();
        this.opponents.forEach(opponent => {
            opponent.appear();
        });
        this.timer.appear();
        this.equation.appear();

    }

    disappear() {

        // Make results disappear
        this.results.disappear();

        // Reset player x position
        this.player.disappear();

        // Make opponents disappear
        this.opponents.forEach(opponent => {

            opponent.disappear();

        });

    }

    quit() {

        // Reset player x position
        this.player.disappear();
        this.player.isQuit = true;

        // Make opponents disappear
        this.opponents.forEach(opponent => {

            opponent.disappear();

        });

        this.timer.disappear();
        this.equation.disappear();

        this.isStart = false;

        this.equation.numEquationsSolved = 0;
        this.equation.correctKeyStrokes = 0;
        this.equation.accuracy = 0;

    }

    isGone() {

        let i = 0
        this.opponents.forEach(opponent => {
            
            if (opponent.alpha == 0) i++;
        
        });
        if (this.player.alpha == 0) i++;
        if (i == 5) return true;
        else return false;

    }

    update(deltaTime, timeStamp) {

        // Update player
        this.player.update(deltaTime, timeStamp);

        // Update opponents
        this.opponents.forEach(opponent => {
            
            opponent.update(deltaTime, timeStamp);

        });

        // Update equation
        this.equation.update();

        // Update timer
        this.timer.update(timeStamp - this.startTime);

        // Update goal line
        this.goalLine.update(deltaTime);

        // Update result screen
        this.results.update();

        // Update countdown
        this.countdown.update();

        // Check if player passed the goal line
        if (this.player.position.x > this.goalLine.position.x) {

            this.isStart = false;
            this.gameCheck++;

        }

        // Set justFinish to true the moment the player crosses the goal line
        if (this.gameCheck == 1)
            this.justFinish = true;
        else
            this.justFinish = false;

    }

    draw(ctx) {

        // Clear canvas
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        // Draw goal line
        this.goalLine.draw(ctx);
    
        // Draw opponent
        this.opponents.forEach(opponent => {

            opponent.draw(ctx);

        });

        // Draw player
        this.player.draw(ctx);

        // Draw equation
        this.equation.draw(ctx);

        // Draw timer
        this.timer.draw(ctx);

        // Draw results
        this.results.draw(ctx);

        // Draw countdown
        this.countdown.draw(ctx);

    }

}