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
        this.button = this.workshop.button;
        this.capsules = this.workshop.capsules;

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

        this.lastClicked = new Date().getTime();

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

        if (this.workshop.hasAllItems()) {

            if (this.button.isMouseOver(mouse.x, mouse.y)) {

                this.button.turnOrange();
    
            } else {
    
                this.button.turnBlue();
    
            }

        } else {

            this.button.turnGray();

        }

    }

    // When clicked
    onClick(e) {
        
        // Spam proof
        if (new Date().getTime() - this.lastClicked > 100) {

            this.lastClicked = new Date().getTime();

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
                this.settings.alpha == 0 && this.workshop.screen.alpha == 0) {

                    this.menu.bgm.fadeOut(0.5);
                    this.game.bgm.fadeIn(0.5);
                    this.game.init(this.background);
                    this.menu.disappear();

                }

                // Go to settings when clicked
                if (this.goToSettings.isMouseOver(mouse.x, mouse.y) && this.goToSettings.alpha == 1 &&
                this.settings.alpha == 0 && this.workshop.screen.alpha == 0)
                this.settings.init(this.menu, this.game);

                // Go out of settings when in setting
                if (!this.settings.isMouseOver(mouse.x, mouse.y) && this.settings.alpha == 1)
                    this.settings.disappear();

                // Go to workshop when clicked
                if (this.goToWorkshop.isMouseOver(mouse.x, mouse.y) && 
                    this.title.alpha == 1 &&
                    this.settings.alpha == 0) {

                    this.workshop.requiredItems = [];
                    if (!this.workshop.isSelectedItemOwned()) {

                        this.button.turnToBuy();
                        if (this.workshop.hasAllItems()) {

                            if (this.button.isMouseOver(mouse.x, mouse.y)) {
                
                                this.button.turnOrange();
                    
                            } else {
                    
                                this.button.turnBlue();
                    
                            }
                
                        } else {
                
                            this.button.turnGray();
                
                        }
                        for (let i = 0; i < this.workshop.readRecipe().length; i++) {
                
                            const currentRecipe = this.workshop.readRecipe()[i];
                            const number = currentRecipe.substring(0, currentRecipe.indexOf("x"));
                            const item = currentRecipe.substring(currentRecipe.indexOf("x") + 1);
                
                            this.workshop.requiredItems[i] = new RequiredItem(this.workshop, 68 * i + 75, item, number);
                
                        }

                    } else {

                        this.button.turnToUse();

                    }

                    this.workshop.appear();
                    this.menu.disappear();

                    setTimeout(() => this.workshop.canExit = true, 2000);

                }

                
                if (this.workshop.screen.alpha == 1) {

                    // Click on button
                    if (this.button.isMouseOver(mouse.x, mouse.y)) {

                        if (this.button.isOrange()) {

                            if (this.button.isBuyButton()) {

                                // Pressed buy
                                this.workshop.addOwnedShip();
                                this.workshop.requiredItems = [];
                                this.button.turnToUse();

                            } else {

                                // Pressed use
                                this.workshop.setUsingShip();
                                this.workshop.inUse.alpha = 1;

                            }

                        }

                    }

                    // Select capsules
                    let capsuleChosen = null;
                    for (let i = 0; i < this.capsules.length; i++) {

                        if (this.capsules[i].isMouseOver(mouse.x, mouse.y)) {

                            this.capsules[i].select();
                            capsuleChosen = i; 
                        
                        }

                    }

                    if (capsuleChosen != null) {

                        // Set selected item
                        localStorage.setItem("lastSelected", capsuleChosen);

                        if (this.workshop.getSelectedItem() == this.workshop.getUsingShip())
                            this.workshop.inUse.alpha = 1;
                        else 
                            this.workshop.inUse.alpha = 0;

                        for (let i = 0; i < this.capsules.length; i++) {

                            if (capsuleChosen != i) {

                                this.capsules[i].unselect();

                            }

                        }

                        this.workshop.requiredItems = [];
                        if (!this.workshop.isSelectedItemOwned()) {

                            // Change colors
                            this.button.turnToBuy();
                            if (this.workshop.hasAllItems()) {

                                if (this.button.isMouseOver(mouse.x, mouse.y)) {
                    
                                    this.button.turnOrange();
                        
                                } else {
                        
                                    this.button.turnBlue();
                        
                                }
                    
                            } else {
                    
                                this.button.turnGray();
                    
                            }
                            for (let i = 0; i < this.workshop.readRecipe().length; i++) {
                    
                                const currentRecipe = this.workshop.readRecipe()[i];
                                const number = currentRecipe.substring(0, currentRecipe.indexOf("x"));
                                const item = currentRecipe.substring(currentRecipe.indexOf("x") + 1);
                    
                                this.workshop.requiredItems[i] = new RequiredItem(this.workshop, 68 * i + 75, item, number);
                                this.workshop.requiredItems[i].setPosition(68 * i + 75, 480);
                                this.workshop.requiredItems[i].alpha = 1;

                            }

                        } else {

                            this.button.turnToUse();

                        }

                    }

                }

                // Exit workshop
                if (!this.workshop.screen.isMouseOver(mouse.x, mouse.y) && 
                    this.workshop.canExit && this.workshop.screen.alpha == 1) {

                    this.workshop.canExit = false;
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

            // Select items
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