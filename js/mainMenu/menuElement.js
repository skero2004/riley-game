class MenuElement {

    init(menu, text, y) {

        this.gameWidth = menu.gameWidth;

        this.position = {

            x: this.gameWidth / 2,
            y: y

        }

        this.alpha = 0;
        this.text = text

    }

    appear() {

        // Necessary calculations
        const fps = 60;
        const secondsToAppear = 2;
        const framesInInterval = fps * secondsToAppear;
        let interval = setInterval(() => {

            // Increase alpha by a little
            this.alpha += 1 / framesInInterval;
            if (this.alpha > 1) {

                this.alpha = 1;
                clearInterval(interval);
            
            }

        }, 1000 / fps);

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

        }, 1000 / fps);

    }

    update() {



    }

    draw(ctx) {

        ctx.globalAlpha = this.alpha;

        ctx.font = "50px SpaceAge";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";

        ctx.fillText(this.text, this.position.x, this.position.y);

        ctx.globalAlpha = 1;

    }

}