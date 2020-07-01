class Countdown extends TextElement {

    init(game) {

        super.init(game);

        this.setPosition(this.gameWidth / 2, this.gameHeight / 2);

        this.setFont("300px SpaceAge");

        this.setColor("white");

        this.game = game;

        this.sound = new Sound("Countdown.wav");
        this.sound.setDefaultVolume(0.5);

    }

    countdown(timeStamp) {

        this.setText("3");
        this.sound.play();
        this.show();
        setTimeout(() => {

            this.setText("2");
            this.sound.play();
            this.show();
            setTimeout(() => {

                this.setText("1");
                this.sound.play();
                this.show();
                setTimeout(() => {

                    this.setText("GO!");
                    this.sound.play();
                    this.show();
                    this.game.isStart = true;
                    this.game.startTime = timeStamp + 3000;

                }, 1000);

            }, 1000);

        }, 1000);

    }

    show() {

        this.appear(0);
        this.disappear(0.7);

    }

    update() {

        this.sound.update();

        super.update();

    }

}