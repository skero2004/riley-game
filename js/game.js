class Game {

    constructor(gameWidth, gameHeight) {

        // Set width and height
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        // Set variables for the robot creation loop
        this.lastCreateRobotTime = 0;
        this.nextCreateRobotTime = 500 + Math.round(Math.random() * 2000);
        this.robots = [];

        // Set initial level
        this.level = 1;

    }

    start() {

        // Objects
        this.player = new Player(this);

        // Input handler
        this.inputs = new InputHandler(this);
        
    }

    update(deltaTime, timeStamp) {

        // Update player position
        this.player.update(deltaTime);

        // Update inputs
        this.inputs.update(this);
        
        // Create new robot every 0.5 ~ 2.5 seconds
        if (timeStamp - this.lastCreateRobotTime > this.nextCreateRobotTime) {

            this.lastCreateRobotTime = timeStamp;
            this.nextCreateRobotTime = 500 + Math.round(Math.random() * 2000) 

            // Create robot
            this.robots.push(new Robot(this))
            this.robots[this.robots.length - 1].makeEquation();

        }

        this.robots.forEach(robot => {
            
            robot.update(deltaTime);

            if (robot.position.x < -robot.width) {

                this.robots.splice(this.robots.indexOf(robot), 1);

            } 

        });

    }

    draw(ctx) {

        this.player.draw(ctx);

        this.robots.forEach(robot => {
            
            robot.draw(ctx);

        });

    }

}