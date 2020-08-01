class Workshop {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.distFromCenter = 100;

        this.secondsToAppear = 0.5;
        this.secondsToDisappear = 0.5;
        
        this.screen = new WorkshopScreen();

        this.capsules = [

            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS"))

        ];

        this.fireSound = new Sound("Move.wav");
        this.fireSound.setDefaultVolume(0.07);

    }

    init() {

        this.screen.init(this);

        const NUM_IN_ROW = 5;

        for (let i = 0; i < this.capsules.length; i++) {

            // Check what row this capsule is in
            let inRow = 1;
            while (i / NUM_IN_ROW >= inRow) {

                inRow++;

            }

            // Check what column this capsule is in
            let inColumn = (i % NUM_IN_ROW) + 1;

            // Set position
            this.capsules[i].init(this, 40 - (720 / NUM_IN_ROW) / 2 + inColumn * (720 / NUM_IN_ROW), 125 + inRow * 130);

        }

    }

    appear() {

        this.fireSound.play();
        this.screen.appear();
        this.capsules.forEach(capsule => {

            capsule.appear();

        })

    }

    disappear() {

        this.fireSound.play();
        this.screen.disappear();
        this.capsules.forEach(capsule => {

            capsule.disappear();

        })

    }

    isAppeared() {

        if (this.screen.alpha > 0)
            return true;

    }

    update() {

        this.fireSound.update();
        this.screen.update();
        this.capsules.forEach(capsule => {

            capsule.update();

        });

    }
    
    draw(ctx) {

        // Clear canvas
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        this.screen.draw(ctx);
        this.capsules.forEach(capsule => {

            capsule.draw(ctx);

        });
        
    }

}