class WorkshopScreen extends ImageElement {

    init(workshop) {

        super.init(workshop);

        this.distFromCenter = workshop.distFromCenter;
        this.setPosition(this.gameWidth / 2, this.gameHeight / 2 + this.distFromCenter);

        this.setImage(document.getElementById("workshopScreen"));

        this.setBorder(188, 549, 36, 761);

        this.workshop = workshop;

    }

    appear() {

        this.setPosition(this.gameWidth / 2, this.gameHeight / 2 + this.distFromCenter);
        super.appear(this.workshop.secondsToAppear);
        this.moveBy(this.workshop.secondsToAppear, 0, -this.distFromCenter);

    }

    disappear() {

        super.disappear(this.workshop.secondsToDisappear);
        this.moveBy(this.workshop.secondsToDisappear, 0, -this.distFromCenter, () => {

            this.setPosition(this.gameWidth / 2, this.gameHeight / 2 + this.distFromCenter);

        });
        
    }

}