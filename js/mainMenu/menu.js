class Menu {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.title = new Title();

    }

    init() {

        this.title.init(this)

    }

    update() {



    }

    draw(ctx) {

        // Clear canvas
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        // Draw title
        this.title.draw(ctx);

    }

}