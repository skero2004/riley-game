class Player {

    constructor(game) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.image = document.getElementById("riley");

        this.width = 200;
        this.height = 86;

        this.position = {

            x: this.gameWidth / 2 - this.width / 2,
            y: this.gameHeight / 2 - this.height / 2

        }

    }

    draw(ctx) {

        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }

    update(deltaTime) {



    }

}