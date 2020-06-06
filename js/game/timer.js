class Timer {

    init(game) {

        this.game = game;

        this.position = {

            x: 730,
            y: 570

        }

        this.startTime = 6000;

        this.alpha = 1;

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

            // Increase alpha by a little
            this.alpha -= 1 / framesInInterval;
            if (this.alpha < 0) {

                this.alpha = 0;
                clearInterval(interval);
            
            }

        }, 1 / fps);

    }

    update(timeStamp) {

        if (this.game.justFinish) this.disappear();

        this.time = Math.round((this.startTime - timeStamp / 10));
        if (this.time < 0) {

            this.time = 0;

        }

    }

    draw(ctx) {

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
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