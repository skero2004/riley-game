class LevelSelector extends TextElement {

    init(settings, x, text) {

        this.settings = settings;

        this.setText(text);

        this.setPosition(x, -20);

        this.setFont("45px SpaceAge");

        this.selectSound = new Sound("Select.wav");
        this.selectSound.setDefaultVolume(0.1);

    }

    select() {

        this.selectSound.play();
        this.setColor("yellow");

    }

    unSelect() {

        this.setColor("white");

    }

    isSelected() {

        if (this.color == "yellow") return true;
        else return false;

    }

    update() {

        this.alpha = this.settings.alpha;
        this.selectSound.update();
        super.update();

    }

}