class GoalLine extends ImageElement {

    init(game) {

        super.init(game);

        this.setImage(document.getElementById("goalLine"));

        this.setPosition(this.gameWidth + this.width / 2, this.gameHeight / 2);

        this.player = game.player;

        this.timer = game.timer;

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
        if (this.timer.time < 5800+secToPlayer * 100) {

            this.moveLeft();
            this.appear(0);

        }
        
        if (this.right < 0) this.disappear(0);

        this.position.x += this.speed * deltaTime / speedThreshold;

    }

}