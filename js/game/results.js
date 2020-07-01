class Results extends ImageElement {

    constructor() {

        super();

        this.item = new Item();

        this.tag = new Tag();

        this.storageNames = {

            MAX_EQUATION: "MaxEquation",
            ACCURACIES: "Accuracies"

        }

        this.fireSound = new Sound("Move.wav");
        this.fireSound.setDefaultVolume(0.07);

        this.showSound = new Sound("ShowResult.wav");
        this.showSound.setDefaultVolume(0.1);

    }

    init(game) {

        super.init(game);

        this.setImage(document.getElementById("scoreBoard"));

        this.distFromCenter = 100;
        this.setPosition(this.gameWidth / 2, this.gameHeight / 2 + this.distFromCenter);

        this.game = game;

        this.player = game.player;

        this.equation = game.equation;

        // Array to show elements that are on screen
        this.isElementsShowing = [];
        this.numElements = 8;
        for (let i = 0; i < this.numElements; i++) {

            this.isElementsShowing.push(false);

        }

        // Choose an item
        this.chooseRandomItem();
        this.itemCheck = 0;
        this.isGettingItem = false;

        // Reset results showed
        this.isResultsShowed = false;

        this.tag.init(this, game.difficulty);

    }

    chooseRandomItem() {

        // Choose rarity
        let images;
        const rarityChooser = Math.random() * 100;

        // Rarity depends on difficulty
        let ultraRarePercentage, rarePercentage, normalPercentage, commonPercentage;
        if (this.game.difficulty == "easy") {

            ultraRarePercentage = 1;
            rarePercentage = 10;
            normalPercentage = 30;
            commonPercentage = 59;

        } else if (this.game.difficulty == "medium") {

            ultraRarePercentage = 5;
            rarePercentage = 15;
            normalPercentage = 30;
            commonPercentage = 50;

        } else {

            ultraRarePercentage = 10;
            rarePercentage = 20;
            normalPercentage = 30;
            commonPercentage = 40;

        }

        if (rarityChooser < ultraRarePercentage) 
            images = document.getElementsByClassName("ultraRare");
        else if (rarityChooser < rarePercentage + ultraRarePercentage) 
            images = document.getElementsByClassName("rare");
        else if (rarityChooser < normalPercentage + rarePercentage + ultraRarePercentage) 
            images = document.getElementsByClassName("normal");
        else 
            images = document.getElementsByClassName("common");

        // Choose image from that rarity
        const imageChooser = Math.floor(Math.random() * images.length);
        const image = images[imageChooser];

        this.item.init(image);

    }

    // Show the elements
    showResults() {

        let i = 0
        let interval = setInterval(() => {

            this.showSound.play();
            this.isElementsShowing[i] = true;
            i++;

            // If statements to check if the player should receive an item
            if ((!this.isGettingItem && i == this.numElements - 1) ||
                (this.isGettingItem && i == this.numElements)) {
                
                this.isResultsShowed = true;
                clearInterval(interval); 
            
            }

        }, 500);

    }

    // Appear on screen plus the elements
    appear() {

        this.fireSound.play();

        setTimeout(() => {

            super.appear(0.5);
            super.moveBy(0.5, 0, -this.distFromCenter);

            this.tag.appear();
            
            setTimeout(() => {

                this.showResults();

            }, 500);

        }, 500);

    }

    // Store results to localStorge
    storeResults() {

        let maxEquationStorage = this.game.difficulty + this.storageNames.MAX_EQUATION;
        let accuraciesStorage = this.game.difficulty + this.storageNames.ACCURACIES;

        // Store and get max number of equations solved
        if (localStorage.getItem(maxEquationStorage) == null || 
            this.equation.numEquationsSolved > localStorage.getItem(maxEquationStorage)) 
            localStorage.setItem(maxEquationStorage, this.equation.numEquationsSolved);

        // Store and get past 30 accuracy for average accuracy
        let pastAccuracies = JSON.parse(`[ ${localStorage.getItem(accuraciesStorage)} ]`);
        if (!isNaN(this.equation.accuracy)) {
            
            if (pastAccuracies[0] == null) pastAccuracies[0] = this.equation.accuracy;
            else if (pastAccuracies.length == 30) {
                pastAccuracies.shift()
                pastAccuracies.push(this.equation.accuracy);
            }
            else pastAccuracies.push(this.equation.accuracy);
        
        }
        localStorage.setItem(accuraciesStorage, pastAccuracies);

        // Calculate average accuracy
        let sum = pastAccuracies.reduce((a, b) => a + b, 0);
        this.averageAccuracy = sum / pastAccuracies.length;

        // Round to hundredths
        this.averageAccuracy = Math.round((this.averageAccuracy + Number.EPSILON) * 100) / 100;

        // If array is empty, then average accuracy is NaN
        if (!Array.isArray(pastAccuracies) || !pastAccuracies.length) this.averageAccuracy = NaN;

    }

    getItem() {

        const rand = Math.random() * 100;
        
        // 100% if you're first place
        if (this.player.place == 1) this.isGettingItem = true;

        // 80% if you're second place
        if (this.player.place == 2 && rand < 80) this.isGettingItem = true;

        // 60% if you're third
        if (this.player.place == 3 && rand < 60) this.isGettingItem = true;

        if (this.isGettingItem) this.item.storeItem();

    }

    disappear() {

        this.fireSound.play();

        // If the item is there, then make it disappear
        if (this.isGettingItem) this.item.disappear();

        this.tag.disappear(0.5);

        super.disappear(0.5);
        this.moveBy(0.5, 0, -this.distFromCenter);

    }

    update() {

        // When the game just finished
        if (this.game.justFinish) {

            this.getItem();
            this.appear();
            this.storeResults();

        }

        this.item.update();

        this.tag.update();
        
        this.fireSound.update();

        this.showSound.update();

        super.update();

    }

    draw(ctx) {
            
        super.draw(ctx);

        // Set the opacity of the image
        ctx.globalAlpha = this.alpha;

        // Translate so center the image
        ctx.translate(this.position.x, this.position.y);

        // Draw title
        ctx.font = "70px SpaceAge";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        if (this.isElementsShowing[0]) ctx.fillText("Results", 0, -220);

        // Draw results
        ctx.font = "40px SpaceAge";
        if (this.isElementsShowing[1]) 
            ctx.fillText(`Place: ${this.player.place}`, 0, -60);
        if (this.isElementsShowing[2]) 
            ctx.fillText(`Equations Solved: ${this.equation.numEquationsSolved}`, 0 , -20);
        if (this.isElementsShowing[3]) 
            ctx.fillText(`Max Equations: ${localStorage.getItem(this.game.difficulty + this.storageNames.MAX_EQUATION)}`, 0, 20)
        if (this.isElementsShowing[4] && !isNaN(this.equation.accuracy)) 
            ctx.fillText(`Accuracy: ${Math.round(this.equation.accuracy * 100)}%`, 0, 60);
        else if (this.isElementsShowing[4]) 
            ctx.fillText("Accuracy: nan", 0, 60);
        if (this.isElementsShowing[5] && !isNaN(this.averageAccuracy)) 
            ctx.fillText(`Avg Accuracy: ${Math.round(this.averageAccuracy * 100)}%`, 0, 100);
        else if (this.isElementsShowing[5]) 
            ctx.fillText("Avg Accuracy: nan", 0, 100);

        // Make item appear
        if (this.isElementsShowing[6] && this.isGettingItem) {
            
            // Increment itemCheck to know the moment the item appears
            this.itemCheck++;

            // Draw "item earned: _"
            ctx.font = "25px SpaceAge"; 
            ctx.fillText("Item Earned:", this.item.position.x + this.item.image.width / 2 + 150, this.item.position.y - 10);
            ctx.fillText(this.item.name, this.item.position.x + this.item.image.width / 2 + 150, this.item.position.y + 10);
        
        }
        if (this.itemCheck == 1) this.item.appear();

        // Draw "press any key to continue"
        ctx.font = "30px SpaceAge"; 
        if (this.isElementsShowing[6] && !this.isGettingItem)
            ctx.fillText("Press any key to continue", 0, 190);   

        if (this.isElementsShowing[7] && this.isGettingItem)
            ctx.fillText("Press any key to continue", 0, 230);

        // Draw item
        this.item.draw(ctx);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Reset alpha
        ctx.globalAlpha = 1;

        // Draw tag
        this.tag.draw(ctx);

    }

}