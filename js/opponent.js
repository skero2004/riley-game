class Opponent {

    constructor(game, y) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.maxSpeed = 10;
        this.speed = 0;

        this.moveTime = 1000;

        this.position = {

            x: 300,
            y: y

        }

        this.lastMoved = 0;
        this.nextMoveTime = 2000 + Math.random() * 8000;

    }

    setImage(image) {
          
        this.image = document.getElementById(image);

        this.width = this.image.width;
        this.height = this.image.height;

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

            // Reset speed
            this.speed = 0 
            this.position.x = Math.round(this.position.x);

        }, this.moveTime);

    }

    draw(ctx) {

        // Translate so center the image
        ctx.translate(this.position.x, this.position.y);

        // Draw image
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    
    }

    update(deltaTime, timeStamp) {
        
        // Move opponent forward or backward randomly
        if (timeStamp > this.lastMoved + this.nextMoveTime) {

            // 90% move right
            let rand = Math.random() * 10;
            if (rand < 9) {

                this.moveRight();

            } else {

                this.moveLeft();

            }

            // Set next time
            this.lastMoved = timeStamp;
            this.nextMoveTime = 2000 + Math.random() * 8000;

        }

        this.position.x += this.speed * deltaTime / 256;

    }

}