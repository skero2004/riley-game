class Countdown extends TextElement {

    init(game) {

        super.init(game);

        this.setPosition(this.gameWidth / 2, this.gameHeight / 2);

        this.setFont("300px SpaceAge");

        this.setColor("white");

        this.game = game;

    }

    countdown(timeStamp) {

        this.setText("3");
        this.show();
        setTimeout(() => {

            this.setText("2");
            this.show();
            setTimeout(() => {

                this.setText("1");
                this.show();
                setTimeout(() => {

                    this.setText("GO!")
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

}