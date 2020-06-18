class Menu {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.title = new Title();

        this.startGame = new MenuElement();
        this.goToSettings = new MenuElement();
        this.goToWorkshop = new MenuElement();

    }

    init(game) {

        this.game = game;
        this.isMenu = true;

        this.title.init(this, this.game);
        this.startGame.init(this, "Start Game", 400, 410, 24);
        this.goToSettings.init(this, "Settings", 460, 320, 24);
        this.goToWorkshop.init(this, "Workshop", 520, 360, 24);

        this.appear();

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

        this.title.update();
        this.startGame.update();
        this.goToSettings.update();
        this.goToWorkshop.update();

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