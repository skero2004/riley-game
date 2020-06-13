class InputHandler {

    init(canvases, game, menu) {

        // Get canvases
        this.canvases = canvases;

        // Get game
        this.game = game;

        // Get menu
        this.menu = menu;

        // Get menu elements
        this.startGame = menu.startGame;
        this.goToSettings = menu.goToSettings;
        this.goToWorkshop = menu.goToWorkshop;

        // Player property
        this.player = game.player;

        // Equation property
        this.equation = game.equation;

        // Opponents
        this.opponents = game.opponents;

        // Results property
        this.results = game.results;

        // Properties to prevent holding key
        this.isHold = false;
        this.lastKey = "";

        // Add event listeners
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
        document.addEventListener("click", this.onClick.bind(this));
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

    }

    // Mouse move
    onMouseMove(e) {

        // Get canvas position for mouse calculation
        this.leftSpace = this.canvases.offsetLeft - this.canvases.clientLeft;
        this.topSpace = this.canvases.offsetTop - this.canvases.clientTop;

        // Get clicked position (0,0) is top left of canvas
        let mouse = {

            x: e.pageX - this.leftSpace,
            y: e.pageY - this.topSpace

        }

        // Turn yellow if mouse over
        if (this.startGame.isMouseOver(mouse.x, mouse.y))
            this.startGame.turnYellow();
        else
            this.startGame.turnWhite();

        if (this.goToSettings.isMouseOver(mouse.x, mouse.y))
            this.goToSettings.turnYellow();
        else
            this.goToSettings.turnWhite();

        if (this.goToWorkshop.isMouseOver(mouse.x, mouse.y))
            this.goToWorkshop.turnYellow();
        else
            this.goToWorkshop.turnWhite();

    }

    // When clicked
    onClick(e) {

        // Get canvas position for mouse calculation
        this.leftSpace = this.canvases.offsetLeft - this.canvases.clientLeft;
        this.topSpace = this.canvases.offsetTop - this.canvases.clientTop;

        // Get clicked position (0,0) is top left of canvas
        let mouse = {

            x: e.pageX - this.leftSpace,
            y: e.pageY - this.topSpace

        }

        // Start game when clicked
        if (this.startGame.isMouseOver(mouse.x, mouse.y))
            this.startGame.startGame();

        // Go to settings when clicked
        if (this.goToSettings.isMouseOver(mouse.x, mouse.y))
            this.goToSettings.goToSettings();

        // Go to workshop when clicked
        if (this.goToWorkshop.isMouseOver(mouse.x, mouse.y))
            this.goToWorkshop.goToWorkshop();

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