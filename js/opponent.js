class Opponent {

    constructor(game, y) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.maxSpeed = 10;
        this.speed = 0;

        this.moveTime = 1000;

        this.width = 200;
        this.height = 80;

        this.position = {

            x: 150,
            y: y

        }

        this.lastMoved = 0;
        this.nextMoveTime = 2000 + Math.random() * 8000;

    }

    setImage(image) {
          
        this.image = document.getElementById(image);

        if (image = "sammy") {

            this.width = 200;
            this.height = 51;

        }

    }

    moveLeft() {

        this.speed = -this.maxSpeed;
        setTimeout(() => { 
            
            this.speed = 0 
            this.position.x = Math.round(this.position.x);

        }, this.moveTime);

    }

    moveRight() {

        this.speed = this.maxSpeed;
        setTimeout(() => { 
        
            this.speed = 0 
            this.position.x = Math.round(this.position.x);

        }, this.moveTime);

    }

    draw(ctx) {
        if(this.image != null) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        } else {
            ctx.fillStyle = "white";
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    update(deltaTime, timeStamp) {
        
        // Move opponent forward or backward randomly
        if (timeStamp > this.lastMoved + this.nextMoveTime) {

            // 80% move right, 20% move left
            let rand = Math.random() * 10;
            if (rand < 8) {

                this.moveRight();

            } else {

                this.moveLeft();

            }

            // Set next time
            this.lastMoved = timeStamp;
            this.nextMoveTime = 2000 + Math.random() * 8000;

        }

        this.position.x += this.speed / deltaTime;

    }

}