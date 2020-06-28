class Timer extends TextElement {

    init(game) {

        super.init(game);
    
        this.setPosition(730, 570);

        this.setFont("30px Arial");
        this.setColor("white");

        this.game = game;

        this.startTime = 6000;
        this.time = 6000;

        this.justNumberLessThanTen = false;
        this.numberChecker = 0;

    }

    appear() {

        super.appear(0.5);

    }

    disappear() {

        super.disappear(0.5);
        setTimeout(() => {

            this.init(this.game);

        }, 500);
    
    }

    update(timeStamp) {

        if (this.game.isStart) {

            // Check if timer just turned 1~10
            this.numberChecker++;
            if (this.time - Math.floor(this.time / 100) * 100 < 95 || this.time > 1000) 
                this.numberChecker = 0;
                
            // If timer just turned 1~10, pulse red
            if (this.numberChecker == 1) this.pulse(0.9, "red");

            this.time = Math.round((this.startTime - timeStamp / 10));
            if (this.time < 0) {

                this.time = 0;

            }

        }

        // Disappear when the game finishes
        if (this.game.justFinish) this.disappear();

        // Set the text
        let additionalStartingZero = "";
        if (this.time < 100)
            additionalStartingZero = "0";
        let additionalTrailingZero = "";
        if (this.time == 0)
            additionalTrailingZero = "0"
        this.setText(additionalStartingZero +
            this.time.toString().slice(0, -2) + "." + this.time.toString().slice(-2) + 
            additionalTrailingZero);

        super.update();

    }

}