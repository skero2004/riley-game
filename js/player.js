class Player {

    constructor(game) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.opponents = game.opponents;

        this.image = document.getElementById("riley");

        this.width = 200;
        this.height = 86;

        this.maxSpeed = 10;
        this.speed = 0;

        this.moveTime = 1000;

        this.position = {

            x: 150,
            y: 225

        }

    }

    moveLeft() {

        if (this.position.x > 46) {

            this.speed = -this.maxSpeed;
            setTimeout(() => { 
            
                this.speed = 0;
                this.position.x = Math.round(this.position.x);

            }, this.moveTime);

        } else {

            this.opponents.forEach(opponent => {

                opponent.moveRight();

            });

        }

    }

    moveRight() {

        if (this.position.x < 610 - this.width) {

            this.speed = this.maxSpeed;
            setTimeout(() => { 
            
                this.speed = 0;
                this.position.x = Math.round(this.position.x);
            
            }, this.moveTime);

        } else {

            this.opponents.forEach(opponent => {

                opponent.moveLeft();

            });

        }

    }

    draw(ctx) {

        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }

    update(deltaTime) {

        this.position.x += this.speed / deltaTime

    }

}