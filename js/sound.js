class Sound {

    static isSound = true;

    constructor(src, isLoop = false) {

        this.sound = document.createElement("audio");
        this.sound.src = `assets/sounds/${src}`;
        this.sound.loop = isLoop;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";

        this.defaultVolume = 1;

        document.body.appendChild(this.sound);

    }

    static toggleAudio() {

        this.isSound = !this.isSound;

    }

    play() {

        this.sound.currentTime = 0;
        if (Sound.isSound) this.sound.play();

    }

    stop() {

        this.sound.pause();

    }

    setDefaultVolume(volume) {

        this.defaultVolume = volume;
        this.sound.volume = volume;

    }

    setVolume(volume) {

        this.sound.volume = volume;

    }

    fadeOut(seconds) {

        const toFade = 0 - this.sound.volume;
        let volume = this.sound.volume;

        // Necessary calculations
        const fps = 60;
        const framesInInterval = fps * seconds;
        const interval = setInterval(() => {

            if (seconds) volume += toFade / framesInInterval;
            else this.sound.volume = this.defaultVolume;
            
            if (volume < 0) this.sound.volume = 0;
            else this.sound.volume = volume;

            if ((this.sound.volume == 0) ||  
                (toFade == 0)) {

                this.sound.volume = 0;
                this.stop();
                clearInterval(interval);
            
            }
    
        }, 1000 / fps);

    }

    fadeIn(seconds) {

        this.play();

        const toFade = this.defaultVolume - this.sound.volume;
        let volume = this.sound.volume;

        // Necessary calculations
        const fps = 60;
        const framesInInterval = fps * seconds;
        const interval = setInterval(() => {

            if (seconds) volume += toFade / framesInInterval;
            else this.sound.volume = this.defaultVolume;
            
            if (toFade < 0 && volume <= this.defaultVolume ||
                toFade > 0 && volume >= this.defaultVolume)
                this.sound.volume = this.defaultVolume;
            else
                this.sound.volume = volume;

            if ((this.sound.volume == this.defaultVolume) || 
                (toFade == 0)) {

                this.sound.volume = this.defaultVolume;
                clearInterval(interval);
            
            }
    
        }, 1000 / fps);

    }

    update() {

        if (!Sound.isSound) {

            this.sound.currentTime = 0;
            this.stop();

        }

    }

}