class InUse extends TextElement {

    init(workshop) {

        this.secondsToAppear = workshop.secondsToAppear;
        this.secondsToDisappear = workshop.secondsToDisappear;
        this.distFromCenter = workshop.distFromCenter;
        this.endX = 400;
        this.endY = 500;

        this.setFont("40px SpaceAge");
        this.setText("In Use");
        this.setColor("yellow");

        this.setPosition(this.endX, this.endY + this.distFromCenter);

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

}