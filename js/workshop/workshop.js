class Workshop {

    constructor(gameWidth, gameHeight) {

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.distFromCenter = 100;

        this.secondsToAppear = 0.5;
        this.secondsToDisappear = 0.5;
        
        this.screen = new WorkshopScreen();

        this.canExit = false;

        this.capsules = [

            new Capsule(document.getElementById("rileyShip")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("orbitalShip")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS")),
            new Capsule(document.getElementById("spaceS"))

        ];
        
        this.button = new Button();

        this.requiredItems = [];

        this.inUse = new InUse();

        this.fireSound = new Sound("Move.wav");
        this.fireSound.setDefaultVolume(0.07);

    }

    init() {

        this.screen.init(this);

        const NUM_IN_ROW = 5;

        // Initialize capsules
        for (let i = 0; i < this.capsules.length; i++) {

            // Check what row this capsule is in
            let inRow = 1;
            while (i / NUM_IN_ROW >= inRow) {

                inRow++;

            }

            // Check what column this capsule is in
            let inColumn = (i % NUM_IN_ROW) + 1;

            // Set position
            this.capsules[i].init(this, 40 - (720 / NUM_IN_ROW) / 2 + inColumn * (720 / NUM_IN_ROW), 125 + inRow * 130);

        }

        if (localStorage.getItem("lastSelected") != "null" || !localStorage.getItem)
            this.capsules[localStorage.getItem("lastSelected")].select();
        else 
            this.capsules[0].select();

        this.button.init(this);
        this.inUse.init(this);

    }

    appear() {

        this.fireSound.play();
        this.screen.appear();
        this.capsules.forEach(capsule => {

            capsule.appear();

        });
        this.requiredItems.forEach(item => {

            item.appear();

        });
        this.button.appear();
        if (this.getSelectedItem() == this.getUsingShip())
            this.inUse.appear();

    }

    disappear() {

        this.fireSound.play();
        this.screen.disappear();
        this.capsules.forEach(capsule => {

            capsule.disappear();

        });
        this.requiredItems.forEach(item => {

            item.disappear();

        });
        this.button.disappear();
        this.inUse.disappear();

    }

    isAppeared() {

        if (this.screen.alpha > 0)
            return true;

    }

    setUsingShip() {

        localStorage.setItem("usingShip", this.getSelectedItem());

    }

    getUsingShip() {

        return localStorage.getItem("usingShip");

    }

    getSelectedItem() {

        if (localStorage.getItem("lastSelected"))
            return this.capsules[localStorage.getItem("lastSelected")].getImageName();
        else 
            return "RileyShip";

    }

    getOwnedShips() {

        return localStorage.getItem("ownedShips").split(",");

    }

    addOwnedShip() {

        const selectedShip = this.getSelectedItem();
        let ownedShips = this.getOwnedShips();
        ownedShips.push(selectedShip);
        localStorage.setItem("ownedShips", ownedShips);

    }

    isSelectedItemOwned() {

        let isSelectedOwned = false;
        for (let i = 0; i < this.getOwnedShips().length; i++) {
        
            if (this.getOwnedShips()[i] == this.getSelectedItem())
                isSelectedOwned = true;

        }

        return isSelectedOwned;

    }

    readRecipe() {

        const recipe = Recipes.recipes.get(this.getSelectedItem());
        return recipe.split(",");

    }

    hasAllItems() {

        if (!this.isSelectedItemOwned()) {

            const ownedItems = localStorage.getItem("items").split(",");
            const recipe = this.readRecipe();
            let numItem = 0;
            let hasItem = [];
            out: for (let i = 0; i < recipe.length; i++) {

                const currentRecipe = recipe[i];
                const number = currentRecipe.substring(0, currentRecipe.indexOf("x"));
                const item = currentRecipe.substring(currentRecipe.indexOf("x") + 1);

                for (let j = 0; j < ownedItems.length; j++) {
                    
                    const currentItem = ownedItems[j];
                    if (currentItem == item) numItem++;

                }

                if (numItem >= number) hasItem.push(true);
                else {
                    
                    hasItem.push(false);
                    break out;
                
                }
            
            }

            if (hasItem.indexOf(false) == -1)
                return true;
            else 
                return false;

        } else {

            return true;

        }

    }

    update() {

        this.fireSound.update();
        this.screen.update();
        this.capsules.forEach(capsule => {

            capsule.update();

        });
        this.requiredItems.forEach(item => {

            item.update();
    
        });
        this.button.update();
        this.inUse.update();

    }
    
    draw(ctx) {

        // Clear canvas
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

        this.screen.draw(ctx);
        this.requiredItems.forEach(item => {

            item.draw(ctx);

        });
        this.capsules.forEach(capsule => {

            capsule.draw(ctx);

        });
        this.button.draw(ctx);
        this.inUse.draw(ctx);
        
    }

}