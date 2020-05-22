class GoalLine {

    constructor(game) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.image = document.getElementById("goalLine");
        this.width = this.image.width;
        this.height = this.image.height;

        this.player = game.player;

        this.timer = game.timer;

        this.position = {

            x: this.gameWidth + this.width / 2,
            y: this.gameHeight / 2

        }

        this.maxSpeed = -150;
        this.speed = 0;

    }

    moveLeft() {

        this.speed = this.maxSpeed;

    }

    update(deltaTime) {

        // Calculate so the goal line will touch the player when the timer is at 0
        const distTravelPerFrame = this.maxSpeed * deltaTime / speedThreshold;
        const distTravelPerSec = distTravelPerFrame * 1000 / deltaTime;
        const distPlayerFromEdge = this.gameWidth - (this.player.position.x + this.player.width / 2);
        const secToPlayer = Math.abs(distPlayerFromEdge / distTravelPerSec);
        if (this.timer.time < 5500 + secToPlayer * 100) {

            this.moveLeft();

        }

        this.position.x += this.speed * deltaTime / speedThreshold;

    }

    draw(ctx) {

        // Translate so the center is origin
        ctx.translate(this.position.x, this.position.y);

        // Draw the image
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

    }

}