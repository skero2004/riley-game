class Item extends ImageElement {        

    init(image) {

        super.init();

        this.setPosition(-200, 160);

        this.scaleTo(0, 0);

        this.setImage(image);

        this.rotateBy(0, 180);

        this.name = image.src.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "").replace(/([A-Z])/g, ' $1').trim();

    }

    appear() {

        super.appear(0.5);
        this.scaleTo(0.5, 1);
        this.rotateBy(0.5, 180);

    }

    disappear() {

        super.disappear(0.5);

    }

    storeItem() {



    }

}