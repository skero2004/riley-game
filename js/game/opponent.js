class Opponent extends ImageElement {

    init(game, y, image) {
 
        super.init(game);
        
        this.setImage(image);

        this.setPosition(-this.width / 2, y);

        super.appear(0);

        this.game = game;

        this.goalLine = game.goalLine;

        this.maxSpeed = 10;

        this.moveTime = 1;

        this.initialXPos = 300;

        this.lastMoved = 0;
        this.nextMoveTime = 2000 + Math.random() * 8000;

        this.isGoalLineCrossed = false;

        this.isDisappearing = false;
        this.disappearSpeed = 150;

        this.isAppearing = false;
        this.initialAppearSpeed = 150;

    }

    moveLeft() {

        this.moveBy(this.moveTime, -40, 0);

    }

    moveRight() {

        this.moveBy(this.moveTime, 40, 0);

    }

    disappear() {

        this.isDisappearing = true;

    }

    appear() {

        super.appear(0);
        this.isAppearing = true;
        this.speed = this.initialAppearSpeed;

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

                super.disappear(0);
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

        super.update();

    }

}