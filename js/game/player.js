class Player extends ImageElement {

    init(game) {

        super.init(game);

        this.setImage(document.getElementById("riley"));

        this.setPosition(-this.width / 2, 275);

        super.appear(0);

        this.game = game;

        this.background = game.background;

        this.opponents = game.opponents;

        this.maxSpeed = 10;

        this.moveTime = 1;

        this.initialXPos = 300;

        this.place = 1;

        this.isDisappearing = false;
        this.disappearSpeed = 150;

        this.isAppearing = false;
        this.initialAppearSpeed = 150;

        this.isMove = true;

    }

    moveLeft() {

        // Slow background
        this.background.setSlow();

        this.isMove = true;

        if (this.position.x > 130) {

            this.moveBy(this.moveTime, -40, 0);

        } else {

            this.opponents.forEach(opponent => {

                opponent.moveRight();

            });

        }

        setTimeout(() => {

            // Normal background
            this.background.setNormal();

            this.isMove = false;

        }, this.moveTime * 1000);

    }

    moveRight() {

        // Quicken background
        this.background.setFast();

        this.isMove = true;

        if (this.position.x < 610) {

            this.moveBy(this.moveTime, 40, 0);

        } else {

            this.opponents.forEach(opponent => {

                opponent.moveLeft();

            });

        }

        setTimeout(() => {

            // Normal background
            this.background.setNormal();

            this.isMove = false;

        }, this.moveTime * 1000);

    }

    disappear() {

        this.isDisappearing = true;

    }

    appear() {

        this.isAppearing = true;
        this.speed = this.initialAppearSpeed;

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

                this.game.isStart = true;
                this.isAppearing = false;
                this.speed = 0;
                this.position.x = this.initialXPos;

                this.isMove = false;

                this.game.startTime = timeStamp;

            }

        }

        // Move riley
        this.position.x += this.speed * deltaTime / speedThreshold;

        super.update();

    }

}