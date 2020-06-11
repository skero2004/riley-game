class InputHandler {

    init(game, menu) {

        // Get game
        this.game = game;

        // Get menu
        this.menu = menu;

        // Player property
        this.player = game.player;

        // Equation property
        this.equation = game.equation;

        // Opponents
        this.opponents = game.opponents;

        // Results property
        this.results = game.results;

        // Get title
        this.title = menu.title;

        // Properties to prevent holding key
        this.isHold = false;
        this.lastKey = "";

        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

    }

    // Key down
    onKeyDown(e) {

        // Check if its a number and key is not holded and game has started
        if (isFinite(e.key) && e.code != "Space" && (!this.isHold || e.key != this.lastKey)
            && this.game.isGame) {

            // Prevent holding down key
            this.isHold = true;
            this.lastKey = e.key;

            // Only add typing when the player is not moving
            if (this.player.speed == 0) {

                this.equation.addTyping(e.key);

            }

        }

        // Check if all results in the results screen showed
        if (this.results.isResultsShowed) {

            // Set results showed to false
            this.results.isResultsShowed = false;

            // Make game elements disappear
            this.game.disappear();

            // Make title appear
            this.menu.appear();

        }
        
    }

    // Key up
    onKeyUp(e) {
        
        // Stop holding when key up
        this.isHold = false;

    }

}