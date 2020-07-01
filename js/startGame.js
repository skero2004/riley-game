class StartGame extends TextElement {

    constructor(GAME_WIDTH, GAME_HEIGHT) {

        super();

        this.gameWidth = GAME_WIDTH;
        this.gameHeight = GAME_HEIGHT;

        this.isStart = false;

        this.appear(0);

    }

    init(game) {

        this.game = game;

        this.setColor("white");

        this.setFont("60px SpaceAge");

        this.setText("Click to start");

        this.setPosition(this.gameWidth / 2, this.gameHeight / 2);

    }

    startGame() {

        this.game.bgm.play();

        this.disappear(0.5);
        this.isStart = true;

    }

    update() {



    }

    draw(ctx) {

        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        ctx.globalAlpha = this.alpha;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

        super.draw(ctx);

        ctx.globalAlpha = 1;

    }

}