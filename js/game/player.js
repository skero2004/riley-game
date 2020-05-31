class Player {

    init(game) {

        this.background = game.background;

        this.opponents = game.opponents;

        this.image = document.getElementById("riley");

        this.width = this.image.width;
        this.height = this.image.height;

        this.maxSpeed = 10;
        this.speed = 0;

        this.moveTime = 1000;

        this.position = {

            x: 300,
            y: 275

        }

        this.place = 1;

    }

    moveLeft() {

        // Slow background
        this.background.setSlow();

        if (this.position.x > 130) {

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

        setTimeout(() => {

            // Normal background
            this.background.setNormal();

        }, this.moveTime);

    }

    moveRight() {

        // Quicken background
        this.background.setFast();

        if (this.position.x < 610) {

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

        setTimeout(() => {

            // Normal background
            this.background.setNormal();

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

    setPlace() {
        
        // Calculate the place of the player

        // Add opponents' x positions
        let opponentXPositions = [];
        this.opponents.forEach(opponent => {

            opponentXPositions.push(opponent.position.x);

        });

        // Sort them in descending order
        opponentXPositions.sort((a, b) => b - a);

        // Compare each one to the player position to check player place
        let i = 1;
        while (opponentXPositions[i - 1] > this.position.x) i++;
        this.place = i;

    }

    update(deltaTime) {

        this.setPlace();
        this.position.x += this.speed * deltaTime / speedThreshold;

    }

}