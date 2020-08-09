class Title extends ImageElement {

    init(menu, game) {

        super.init(menu);

        this.game = game;

        this.setImage(document.getElementById("title"));

        this.deltaY = 100;
        this.showYPosition = 200;
        this.setPosition(this.gameWidth / 2, this.showYPosition + this.deltaY);

    }

    appear() {

        this.setPosition(this.gameWidth / 2, this.showYPosition + this.deltaY);
        super.appear(1.5);
        this.moveBy(1.5, 0, -this.deltaY);

    }

    disappear() {

        super.disappear(1.5);
        this.moveBy(1.5, 0, -this.deltaY, () => {
         
            this.setPosition(this.gameWidth / 2, this.showYPosition + this.deltaY)
        
        });

    }
    
}