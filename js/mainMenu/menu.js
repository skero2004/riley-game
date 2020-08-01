class Menu {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.title = new Title();

        this.startGame = new MenuElement();
        this.goToSettings = new MenuElement();
        this.goToWorkshop = new MenuElement();

        this.settings = new Settings();

        this.bgm = new Sound("Menu.wav", true);
        this.bgm.setDefaultVolume(0.15);

    }

    init(game) {
    
        this.game = game;

        this.title.init(this, this.game);
        this.startGame.init(this, "Start Game", 400, 376, 400, 195, 605);
        this.goToSettings.init(this, "Settings", 460, 436, 460, 240, 560);
        this.goToWorkshop.init(this, "Workshop", 520, 496, 520, 220, 580);

        this.appear();

    }

    isAppeared() {

        if (this.startGame.alpha > 0)
            return true;

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
        this.settings.update();
        this.bgm.update();

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

        // Draw settings
        this.settings.draw(ctx);

    }

}