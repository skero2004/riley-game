class InputHandler {

    init(canvases, game, background, menu, workshop, startGame, itemLister) {

        this.itemLister = itemLister;

        this.firstScreen = startGame;

        // Get canvases
        this.canvases = canvases;

        // Get game
        this.game = game;

        // Get background
        this.background = background;

        // Get menu
        this.menu = menu;
        this.title = menu.title;

        // Get workshop
        this.workshop = workshop;

        // Get menu elements
        this.startGame = menu.startGame;
        this.goToSettings = menu.goToSettings;
        this.goToWorkshop = menu.goToWorkshop;
        this.settings = menu.settings;
        this.selectors = menu.settings.selectors;
        this.levelSelectors = menu.settings.levelSelectors;
        this.soundSetter = menu.settings.soundSetter;

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
        this.leftSpace = this.canvases.getBoundingClientRect().left;
        this.topSpace = this.canvases.getBoundingClientRect().top;

        // Get clicked position (0,0) is top left of canvas
        let mouse = {

            x: e.clientX - this.leftSpace,
            y: e.clientY - this.topSpace

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
        this.leftSpace = this.canvases.getBoundingClientRect().left;
        this.topSpace = this.canvases.getBoundingClientRect().top;

        // Get clicked position (0,0) is top left of canvas
        let mouse = {

            x: e.clientX - this.leftSpace,
            y: e.clientY - this.topSpace

        }

        if (!this.firstScreen.isStart && mouse.x > 0 && mouse.x < 800 &&
                                         mouse.y > 0 && mouse.y < 600) 
            this.firstScreen.startGame();

        // Do menu stuff only when the game screen is gone
        if (this.game.isGone()) {

            // Start game when clicked
            if (this.startGame.isMouseOver(mouse.x, mouse.y) && this.startGame.alpha == 1 &&
            this.settings.alpha == 0) {

                this.menu.bgm.fadeOut(0.5);
                this.game.bgm.fadeIn(0.5);
                this.game.init(this.background);
                this.menu.disappear();

            }

            // Go to settings when clicked
            if (this.goToSettings.isMouseOver(mouse.x, mouse.y) && this.goToSettings.alpha == 1 &&
            this.settings.alpha == 0)
            this.settings.init(this.menu, this.game);

            // Go out of settings when in setting
            if (!this.settings.isMouseOver(mouse.x, mouse.y) && this.settings.alpha == 1)
                this.settings.disappear();

            // Go to workshop when clicked
            if (this.goToWorkshop.isMouseOver(mouse.x, mouse.y) && 
                this.title.alpha == 1 &&
                this.settings.alpha == 0) {

                this.workshop.appear();
                this.menu.disappear();

            }

            if (!this.workshop.screen.isMouseOver(mouse.x, mouse.y) && 
                this.workshop.screen.alpha == 1 && this.title.alpha == 0) {

                this.workshop.disappear();
                this.menu.appear();

            }

            // Change operators
            if (this.settings.alpha == 1) {

                this.selectors.forEach(selector => {
                
                    if (selector.isMouseOver(mouse.x - this.settings.position.x, mouse.y - this.settings.position.y)) {
    
                        if (selector.isSelected()) {
    
                            if (this.game.usedOperations.length > 1) {
    
                                selector.unSelect();
                                this.game.usedOperations = this.game.usedOperations.replace(selector.text, "");
    
                            }
    
                        } else {
    
                            selector.select();
                            this.game.usedOperations += selector.text;
    
                        }
    
                    }  
    
                }); 
                
                // Change diffuculty
                for (let i = 0; i < this.levelSelectors.length; i++) {
    
                    if (this.levelSelectors[i].isMouseOver(mouse.x, mouse.y)) {
    
                        this.levelSelectors[i].select();
                        this.game.difficulty = this.levelSelectors[i].text.toLowerCase();
    
                        for (let j = 0; j < this.levelSelectors.length; j++) {
    
                            if (i != j) this.levelSelectors[j].unSelect();
    
                        }
    
                    }
    
                }

                if (this.soundSetter.isMouseOver(mouse.x - this.settings.position.x, 
                                                 mouse.y - this.settings.position.y))
                    this.soundSetter.toggleSound();
                
            }

        }

        const items = document.getElementById("itemList").getElementsByTagName("img");
        for (let i = 0; i < items.length; i++) {

            const rect = items[i].getBoundingClientRect();
            if (e.clientX > rect.left && e.clientX < rect.right &&
                e.clientY > rect.top && e.clientY < rect.bottom) {
            
                const itemName = items[i].src.replace(/^.*[\\\/]/, "").replace(/\.[^/.]+$/, "").replace(/([A-Z])/g, ' $1').trim();
                const itemDescription = document.getElementById("itemDescription").getElementsByTagName("p");
                itemDescription[0].innerHTML = itemName + ":";

                itemDescription[1].innerHTML = ItemDescriptions.getDescription(itemName.replace(/\s/g, ""));

                this.itemLister.chosenItem = itemName;

            }

        }

    }

    // Key down
    onKeyDown(e) {

        // Check if its a number and key is not holded and game has started
        if (isFinite(e.key) && e.code != "Space" && (!this.isHold || e.key != this.lastKey)
            && this.game.isStart) {

            // Prevent holding down key
            this.isHold = true;
            this.lastKey = e.key;

            // Only add typing when the player is not moving
            if (!this.player.isMove) {

                this.equation.addTyping(e.key);

            }

        }

        if (this.game.isStart && e.code == "Escape") {

            this.game.quit();

        }

        // Check if all results in the results screen showed
        if (this.results.isResultsShowed) {

            // Set results showed to false
            this.results.isResultsShowed = false;

            this.game.bgm.fadeOut(0.5);
            this.menu.bgm.fadeIn(0.5);

            // Make game elements disappear
            this.game.disappear();

            // Make title appear
            this.menu.init(this.game);

        }
        
    }

    // Key up
    onKeyUp(e) {
        
        // Stop holding when key up
        this.isHold = false;

    }

}