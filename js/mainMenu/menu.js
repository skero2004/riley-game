class Menu {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.title = new Title();

        this.startGame = new MenuElement(196, 606, 376, 400);
        this.goToSettings = new MenuElement(241, 561, 436, 460);
        this.goToWorkshop = new MenuElement(221, 581, 496, 520);

    }

    init() {

        this.title.init(this);
        this.startGame.init(this, "Start Game", 400);
        this.goToSettings.init(this, "Settings", 460);
        this.goToWorkshop.init(this, "Workshop", 520);

    }

    appear() {

        this.title.appear();
        this.startGame.appear();
        this.goToSettings.appear();
        this.goToWorkshop.appear();

    }

    disappear() {

        this.title.disappear();
        this.startGame.disappear();
        this.goToSettings.disappear();
        this.goToWorkshop.disappear();

    }

    update() {



    }

    draw(ctx) {

        // Clear canvas
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        // Draw title
        this.title.draw(ctx);

        // Draw game elements
        this.startGame.draw(ctx);
        this.goToSettings.draw(ctx);
        this.goToWorkshop.draw(ctx);

    }

}