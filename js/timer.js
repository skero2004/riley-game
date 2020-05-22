class Timer {

    constructor() {

        this.position = {

            x: 730,
            y: 570

        }

        this.startTime = 6000;

    }

    update(timeStamp) {

        this.time = Math.round((this.startTime - timeStamp / 10));
        if (this.time < 0) {

            this.time = 0;

        }

    }

    draw(ctx) {

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
       
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

    }

}