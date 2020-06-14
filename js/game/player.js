class Player {

    init(game) {

        this.game = game;

        this.gameWidth = game.gameWidth;

        this.background = game.background;

        this.opponents = game.opponents;

        this.image = document.getElementById("riley");

        this.width = this.image.width;
        this.height = this.image.height;

        this.maxSpeed = 10;

        this.moveTime = 1000;

        this.initialXPos = 300;
        this.position = {

            x: -this.width / 2,
            y: 275

        }

        this.place = 1;

        this.isDisappearing = false;
        this.disappearSpeed = 150;

        this.isAppearing = false;
        this.initialAppearSpeed = 150;

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

    disappear() {

        this.isDisappearing = true;

    }

    appear() {

        this.isAppearing = true;
        this.speed = this.initialAppearSpeed;

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

    update(deltaTime ,timeStamp) {

        // Calculate place
        if (this.game.isGame) this.setPlace();

        // Disappear
        if (this.isDisappearing) {

            this.speed = this.disappearSpeed;
            
            if (this.position.x - this.width / 2 > this.gameWidth) {

                this.isDisappearing = false;
                this.speed = 0;

            }

        }

        // Appear
        if (this.isAppearing) {

            // Calculate speed
            const moveDist = this.initialXPos + this.width / 2;
            const rate = 1 - ((this.initialAppearSpeed * deltaTime / speedThreshold) / moveDist);

            this.speed *= rate;

            this.position.x += 0.1;

            if (this.position.x > this.initialXPos) {

                this.game.isStart = true;
                this.isAppearing = false;
                this.speed = 0;
                this.position.x = this.initialXPos;

                this.game.startTime = timeStamp;

            }

        }

        // Move riley
        this.position.x += this.speed * deltaTime / speedThreshold;

    }

}