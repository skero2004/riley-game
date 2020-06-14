class Title {

    init(menu, game) {

        this.game = game;
        this.menu = menu;
        this.gameWidth = menu.gameWidth;

        this.image = document.getElementById("title");

        this.width = this.image.width;
        this.height = this.image.height;

        this.deltaY = 100;
        this.showYPosition = 200;
        this.position = {

            x: this.gameWidth / 2,
            y: this.showYPosition + this.deltaY

        }

        this.alpha = 0;

    }

    appear() {

        // Necessary calculations
        const fps = 60;
        const secondsToAppear = 1.5;
        const framesInInterval = fps * secondsToAppear;
        let interval = setInterval(() => {

            // Increase y position by a little
            this.position.y -= this.deltaY / framesInInterval;

            // Increase alpha by a little
            this.alpha += 1 / framesInInterval;
            if (this.alpha > 1) {

                this.position.y = this.showYPosition;
                this.alpha = 1;
                clearInterval(interval);
            
            }

        }, 1000 / fps);

    }

    disappear() {

        // Necessary calculations
        const fps = 60;
        const secondsToAppear = 1.5;
        const framesInInterval = fps * secondsToAppear;
        let interval = setInterval(() => {

            // Increase y position by a little
            this.position.y -= this.deltaY / framesInInterval;

            // Increase alpha by a little
            this.alpha -= 1 / framesInInterval;
            if (this.alpha < 0) {

                this.position.y = this.showYPosition;
                this.alpha = 0;
                this.menu.isMenu = false;
                clearInterval(interval);
            
            }

        }, 1000 / fps);

    }

    update() {



    }

    draw(ctx) {

        // Set opacity
        ctx.globalAlpha = this.alpha;

        // Translate so the center is origin
        ctx.translate(this.position.x, this.position.y);

        // Draw the image
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        ctx.globalAlpha = 1;
        
    }

}