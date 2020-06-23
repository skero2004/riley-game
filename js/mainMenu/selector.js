class Selector extends ImageElement {

    init(settings, x, text) {

        this.settings = settings;

        this.text = text;

        this.setPosition(x, -120);

    }

    select() {

        this.setImage(document.getElementById("selected"));

    }

    unSelect() {

        this.setImage(document.getElementById("selector"));

    }

    isSelected() {

        if (this.image == document.getElementById("selected")) return true;
        else return false;

    }

    update() {

        this.alpha = this.settings.alpha;

        super.update();

    }

    draw(ctx) {

        super.draw(ctx);

        // Translate to settings position
        ctx.translate(this.settings.position.x, this.settings.position.y);

        // Translate to own position
        ctx.translate(this.position.x, this.position.y);

        // Set the opacity of the text
        ctx.globalAlpha = this.alpha;

        // Set text
        ctx.font = "48px SpaceAge";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, 0, 14);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Translate to settings position
        ctx.translate(this.settings.position.x, this.settings.position.y);

    }

}