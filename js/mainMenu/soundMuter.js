class SoundMuter extends ImageElement {

    constructor() {

        super();
        
        this.setImage(document.getElementById("soundOn"));

    }

    init(settings, menu) {

        this.setPosition(0, 50);

        this.settings = settings;

        this.menu = menu;

    }

    toggleSound() {

        if (Sound.isSound)
            this.setImage(document.getElementById("soundOff"));
        else
            this.setImage(document.getElementById("soundOn"));

        Sound.toggleAudio();

        if (Sound.isSound) this.menu.bgm.play();

    }

    update() {

        this.alpha = this.settings.alpha;

        super.update();

    }

}