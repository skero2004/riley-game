class Capsule extends ImageElement {

    constructor(image) {

        super();

        this.itemImage = image;

    }

    init(workshop, x, y) {

        this.secondsToAppear = workshop.secondsToAppear;
        this.secondsToDisappear = workshop.secondsToDisappear;
        this.distFromCenter = workshop.distFromCenter;
        this.endX = x;
        this.endY = y;

        this.setPosition(x, y + this.distFromCenter);
        this.setImage(document.getElementById("capsule"));

    }

    appear() {

        this.setPosition(this.endX, this.endY + this.distFromCenter);
        super.appear(this.secondsToAppear);
        this.moveBy(this.secondsToAppear, 0, -this.distFromCenter);

    }

    disappear() {

        super.disappear(this.secondsToDisappear);
        this.moveBy(this.secondsToDisappear, 0, -this.distFromCenter);

        setTimeout(() => {

            this.setPosition(this.endX, this.endY + this.distFromCenter);

        }, this.secondsToDisappear * 1000);

    }

    draw(ctx) {

        super.draw(ctx);

        // Set the opacity of the image
        ctx.globalAlpha = this.alpha;

        // Translate so center the image
        ctx.translate(this.position.x, this.position.y);

        ctx.drawImage(this.itemImage, -this.itemImage.width / 2, -this.itemImage.height / 2 -20);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Reset alpha
        ctx.globalAlpha = 1;

    }

}