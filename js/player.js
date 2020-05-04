class Player {

    constructor(game) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.width = 100
        this.height = 60;

        this.position = {

            x: 40,
            y: this.gameHeight / 2 - this.height / 2

        }

    }

    draw(ctx) {

        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    }

    update(deltaTime) {



    }

}