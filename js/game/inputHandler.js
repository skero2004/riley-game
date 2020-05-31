class InputHandler {

    init(game) {

        // Player property
        this.player = game.player;

        // Equation property
        this.equation = game.equation;

        // Properties to prevent holding key
        this.isHold = false;
        this.lastKey = "";

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

    }

    // Key down
    onKeyDown(e) {

        // Check if its a number and key is not holded
        if (isFinite(e.key) && e.code != "Space" && (!this.isHold || e.key != this.lastKey)) {

            // Prevent holding down key
            this.isHold = true;
            this.lastKey = e.key;

            // Only add typing when the player is not moving
            if (this.player.speed == 0) {

                this.equation.addTyping(e.key);

            }

        }
        
    }

    // Key up
    onKeyUp(e) {
        
        // Stop holding when key up
        this.isHold = false;

    }

    // Key hold
    update() {

        

    }

}