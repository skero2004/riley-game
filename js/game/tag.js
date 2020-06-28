class Tag extends ImageElement {

    init(results, difficulty) {

        this.setImage(document.getElementById(`${difficulty}Tag`));

        this.results = results;

    }

    appear() {

        super.appear(0.5);

    }

    disappear() {

        super.disappear(0.5);

    }

    update() {

        this.setPosition(-275 + this.results.position.x, -85 + this.results.position.y);

        super.update();

    }

}