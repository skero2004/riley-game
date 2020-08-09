class RequiredItem extends ImageElement {

    constructor(workshop, x, item, number) {

        super();

        this.secondsToAppear = workshop.secondsToAppear;
        this.secondsToDisappear = workshop.secondsToDisappear;
        this.distFromCenter = workshop.distFromCenter;
        this.endX = x;
        this.endY = 480;

        this.setPosition(x, this.endY + this.distFromCenter);
        this.setImage(document.getElementById("itemHolder"));
        
        this.item = document.createElement("img");
        this.item.src = "assets/images/items/" + item + ".png";
        this.number = number;

        // Scale to fit
        let max = Math.max(this.item.width, this.item.height);
        this.item.width = this.item.width / max * 50;
        this.item.height = this.item.height / max * 50;

    }

    appear() {

        this.setPosition(this.endX, this.endY + this.distFromCenter);
        super.appear(this.secondsToAppear);
        this.moveBy(this.secondsToAppear, 0, -this.distFromCenter);

    }

    disappear() {

        super.disappear(this.secondsToDisappear);
        this.moveBy(this.secondsToDisappear, 0, -this.distFromCenter, () => {

            this.setPosition(this.endX, this.endY + this.distFromCenter);

        });

    }

    draw(ctx) {

        super.draw(ctx);

        // Set the opacity of the image
        ctx.globalAlpha = this.alpha;

        // Translate so center the image
        ctx.translate(this.position.x, this.position.y);

        // Draw
        ctx.drawImage(this.item, -this.item.width / 2, -this.item.height / 2, 
                      this.item.width, this.item.height);

        // Set font
        ctx.font = "20px SpaceAge";

        // Set color
        ctx.fillStyle = "white";

        // Align to center
        ctx.textAlign = "center";

        // Draw text
        ctx.fillText(this.number + "x", 0, 45);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Reset alpha
        ctx.globalAlpha = 1;

    }

}