class Button extends ImageElement {

    init(workshop) {

        this.secondsToAppear = workshop.secondsToAppear;
        this.secondsToDisappear = workshop.secondsToDisappear;
        this.distFromCenter = workshop.distFromCenter;
        this.endX = 665;
        this.endY = 495;

        this.setPosition(this.endX, this.endY + this.distFromCenter);
        this.setImage(document.getElementById("buyButton"));

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

    turnBlue() {

        if (this.isBuyButton())
            this.setImage(document.getElementById("buyButton"));
        else
            this.setImage(document.getElementById("useButton"));

    }

    turnOrange() {

        if (this.isBuyButton())
            this.setImage(document.getElementById("buyButtonHovered"));
        else
            this.setImage(document.getElementById("useButtonHovered"));

    }

    turnGray() {

        this.setImage(document.getElementById("buyButtonCant"));

    }

    turnToUse() {

        this.setImage(document.getElementById("useButton"));

    }

    turnToBuy() {

        this.setImage(document.getElementById("buyButton"));

    }

    isOrange() {

        if (this.image == document.getElementById("buyButtonHovered") ||
            this.image == document.getElementById("useButtonHovered"))
            return true;
        else return false;

    }

    isBuyButton() {

        if (this.image == document.getElementById("buyButton") || 
            this.image == document.getElementById("buyButtonCant") ||
            this.image == document.getElementById("buyButtonHovered"))
            return true;
        else 
            return false;

    }

}