class MenuElement extends TextElement {
    
    init(menu, text, y, top, bottom, left, right) {

        super.init(menu);

        this.setPosition(this.gameWidth / 2, y);

        this.setBorder(top, bottom, left, right);

        this.setText(text);
        this.setColor("white");
        this.setFont("50px SpaceAge");

    }

    appear() {

        super.appear(2);

    }

    disappear() {

        super.disappear(1);

    }

    turnWhite() {

        this.setColor("white");

    }

    turnYellow() {

        this.setColor("yellow");

    }

}