class Settings extends ImageElement {

    constructor() {

        super();

        this.selectors = [];
        for (let i = 0; i < 4; i++) {

            this.selectors.push(new Selector());

        }
        this.selectors[0].setImage(document.getElementById("selected"));
        this.selectors[1].setImage(document.getElementById("selected"));
        this.selectors[2].setImage(document.getElementById("selector"));
        this.selectors[3].setImage(document.getElementById("selector"));

        this.levelSelectors = [];
        for (let i = 0; i < 3; i++) {

            this.levelSelectors.push(new LevelSelector());

        }
        this.levelSelectors[0].setColor("white");
        this.levelSelectors[0].setBorder(260, 280, 124, 280);
        this.levelSelectors[1].setColor("yellow");
        this.levelSelectors[1].setBorder(260, 280, 295, 508);
        this.levelSelectors[2].setColor("white");
        this.levelSelectors[2].setBorder(260, 280, 524, 628)

        this.setPosition(this.gameWidth / 2, this.gameHeight / 2 + this.distFromCenter);

        this.fireSound = new Sound("Move.wav");
        this.fireSound.setDefaultVolume(0.07);

        this.soundSetter = new SoundMuter();

    }

    init(menu, game) {

        super.init(menu);

        this.distFromCenter = 70;
        this.setPosition(this.gameWidth / 2, this.gameHeight / 2 + this.distFromCenter);

        this.setImage(document.getElementById("settings"));

        this.setBorder(54, 505, 31, 770);

        this.appear();

        this.selectors[0].init(this, -220, "+");
        this.selectors[1].init(this, -140, "-");
        this.selectors[2].init(this, -60, "x");
        this.selectors[3].init(this, 20, "/");

        this.levelSelectors[0].init(this, -200, "Easy");
        this.levelSelectors[1].init(this, 0, "Medium");
        this.levelSelectors[2].init(this, 200, "Hard");

        this.soundSetter.init(this, menu);

        this.game = game;

    }

    appear() {

        this.fireSound.play();
        super.appear(0.5);
        this.moveBy(0.5, 0, -this.distFromCenter);

    }

    disappear() {

        this.fireSound.play();
        super.disappear(0.5);
        this.moveBy(0.5, 0, -this.distFromCenter);

    }

    update() {

        if (this.alpha) {

            this.selectors.forEach(selector => {

                selector.update();
    
            });

            this.levelSelectors.forEach(levelSelector => {

                levelSelector.update();

            })

            this.fireSound.update();

            this.soundSetter.update();
    
            super.update();    

        }

    }

    draw(ctx) {

        if (this.alpha) {

            // Draw image
            super.draw(ctx);

            // Set the opacity of the image
            ctx.globalAlpha = this.alpha;

            // Translate so center the image
            ctx.translate(this.position.x, this.position.y);

            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.font = "60px SpaceAge";
            ctx.fillText("Difficulty: ", -70, -180);

            ctx.font = "30px SpaceAge";
            ctx.fillText("Click outside to go back", 0, 160);

            // Draw selectors
            this.selectors.forEach(selector => {

                selector.draw(ctx);

            });

            // Draw level selectors
            this.levelSelectors.forEach(levelSelector => {

                levelSelector.draw(ctx);

            });

            // Draw sound setters
            this.soundSetter.draw(ctx);

            // Reset transform
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            // Reset alpha
            ctx.globalAlpha = 1;

        }

    }

}