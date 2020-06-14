class Opponent {

    init(game, y, image) {
 
        this.game = game;

        this.gameWidth = game.gameWidth;

        this.image = image;

        this.width = this.image.width;
        this.height = this.image.height;

        this.goalLine = game.goalLine;

        this.maxSpeed = 10;

        this.moveTime = 1000;

        this.initialXPos = 300;
        this.position = {

            x: -this.width / 2,
            y: y

        }

        this.lastMoved = 0;
        this.nextMoveTime = 2000 + Math.random() * 8000;

        this.isGoalLineCrossed = false;

        this.isDisappearing = false;
        this.disappearSpeed = 150;

        this.isAppearing = false;
        this.initialAppearSpeed = 150;

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

    update(deltaTime, timeStamp) {
        
        // Setting isGoalLineCrossed
        if (this.position.x > this.goalLine.position.x)
            this.isGoalLineCrossed = true;

        // Move opponent forward or backward randomly
        if (timeStamp > this.lastMoved + this.nextMoveTime && !this.isGoalLineCrossed && this.game.isStart) {

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

                this.isAppearing = false;
                this.speed = 0;
                this.position.x = this.initialXPos;

            }

        }

        this.position.x += this.speed * deltaTime / speedThreshold;

    }

}