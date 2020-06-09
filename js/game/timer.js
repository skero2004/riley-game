class Timer {

    init(game) {

        this.game = game;

        this.position = {

            x: 730,
            y: 570

        }

        this.startTime = 6000;
        this.time = 6000;

        this.alpha = 1;

        this.justNumberLessThanTen = false;
        this.numberChecker = 0;

        this.color = "white";

    }

    appear() {

        // Necessary calculations
        const fps = 60;
        const secondsToAppear = 1;
        const framesInInterval = fps * secondsToAppear;
        let interval = setInterval(() => {

            // Increase alpha by a little
            this.alpha += 1 / framesInInterval;
            if (this.alpha > 1) {

                this.alpha = 1;
                clearInterval(interval);
            
            }

        }, 1 / fps);

    }

    disappear() {

        // Necessary calculations
        const fps = 60;
        const secondsToDisappear = 1;
        const framesInInterval = fps * secondsToDisappear;
        let interval = setInterval(() => {

            // Decrease alpha by a little
            this.alpha -= 1 / framesInInterval;
            if (this.alpha < 0) {

                this.alpha = 0;
                clearInterval(interval);
            
            }

        }, 1 / fps);

    }

    pulseRed() {

        // Fade from red to white
        let redness = 0;
        const fps = 60;
        const secondsToFade = 1;
        const framesInInterval = fps * secondsToFade;
        let interval = setInterval(() => {

            this.color = `rgba(255, ${redness}, ${redness})`;
            redness += 255 / framesInInterval; // increase redness
            if (redness > 255) {

                this.textColor = "white";
                clearInterval(interval);
            
            }

        }, 1 / fps);

    }

    update(timeStamp) {

        // Check if timer just turned 1~10
        this.numberChecker++;
        if (this.time - Math.floor(this.time / 100) * 100 < 95 || this.time > 1000) 
            this.numberChecker = 0;

        // If timer just turned 1~10, pulse red
        if (this.numberChecker == 1) this.pulseRed();

        // Disappear when the game finishes
        if (this.game.justFinish) this.disappear();

        this.time = Math.round((this.startTime - timeStamp / 10));
        if (this.time < 0) {

            this.time = 0;

        }

    }

    draw(ctx) {

        ctx.font = "30px Arial";
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";

        ctx.globalAlpha = this.alpha;
       
        let additionalStartingZero = "";
        if (this.time < 100)
            additionalStartingZero = "0";
        let additionalTrailingZero = "";
        if (this.time == 0)
            additionalTrailingZero = "0"
        ctx.fillText(additionalStartingZero +
            this.time.toString().slice(0, -2) + "." + this.time.toString().slice(-2) + 
            additionalTrailingZero, 
        this.position.x, this.position.y);

        ctx.globalAlpha = 1;

    }

}