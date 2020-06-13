class Results {

    constructor() {

        this.item = new Item();

        this.storageNames = {

            MAX_EQUATION: "maxEquation",
            ACCURACIES: "accuracies"

        }

    }

    init(game) {

        this.game = game;

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.player = game.player;

        this.image = document.getElementById("scoreBoard");
        this.width = this.image.width;
        this.height = this.image.height;

        this.alpha = 0;

        this.distFromCenter = 100;
        this.position = {

            x: this.gameWidth / 2,
            y: this.gameHeight / 2 + this.distFromCenter

        }

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

    }

    chooseRandomItem() {

        // Choose rarity
        let images;
        const rarityChooser = Math.random() * 100;
        if (rarityChooser < 5) images = document.getElementsByClassName("ultraRare");
        else if (rarityChooser < 20) images = document.getElementsByClassName("rare");
        else if (rarityChooser < 50) images = document.getElementsByClassName("normal");
        else images = document.getElementsByClassName("common");

        // Choose image from that rarity
        const imageChooser = Math.floor(Math.random() * images.length);
        const image = images[imageChooser];

        this.item.init(image);

    }

    // Show the elements
    showResults() {

        let i = 0
        let interval = setInterval(() => {

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

        setTimeout(() => {

            // Necessary calculations
            const fps = 60;
            const secondsToAppear = 0.5;
            const framesInInterval = fps * secondsToAppear;
            let interval = setInterval(() => {

                // Move results up by a little
                this.position.y -= this.distFromCenter / framesInInterval;
    
                // Increase alpha by a little
                this.alpha += 1 / framesInInterval;
                if (this.position.y < this.gameHeight / 2) {
    
                    this.position.y = this.gameHeight / 2;
                    this.alpha = 1;
                    this.showResults();
                    clearInterval(interval);
                
                }
    
            }, 1000 / fps);

        }, 500);

    }

    // Store results to localStorge
    storeResults() {

        // Store and get max number of equations solved
        if (localStorage.getItem(this.storageNames.MAX_EQUATION) == null || 
            this.equation.numEquationsSolved > localStorage.getItem(this.storageNames.MAX_EQUATION)) 
            localStorage.setItem(this.storageNames.MAX_EQUATION, this.equation.numEquationsSolved);

        // Store and get past 30 accuracy for average accuracy
        let pastAccuracies = JSON.parse(`[ ${localStorage.getItem(this.storageNames.ACCURACIES)} ]`);
        if (!isNaN(this.equation.accuracy)) {
            
            if (pastAccuracies[0] == null) pastAccuracies[0] = this.equation.accuracy;
            else if (pastAccuracies.length == 30) {
                pastAccuracies.shift()
                pastAccuracies.push(this.equation.accuracy);
            }
            else pastAccuracies.push(this.equation.accuracy);
        
        }
        localStorage.setItem(this.storageNames.ACCURACIES, pastAccuracies);

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

        // If the item is there, then make it disappear
        if (this.isGettingItem) this.item.disappear();

        // Necessary calculations
        const fps = 60;
        const secondsToDisappear = 0.5;
        const framesInInterval = fps * secondsToDisappear;
        let interval = setInterval(() => {

            // Move results up by a little
            this.position.y -= this.distFromCenter / framesInInterval;

            // Increase alpha by a little
            this.alpha -= 1 / framesInInterval;
            if (this.position.y < this.gameHeight / 2 - this.distFromCenter) {

                this.position.y = this.gameHeight / 2 - this.distFromCenter;
                this.alpha = 0;
                clearInterval(interval);
            
            }

        }, 1000 / fps);

    }

    update() {

        // When the game just finished
        if (this.game.justFinish) {

            this.getItem();
            this.appear();
            this.storeResults();

        }

    }

    draw(ctx) {
            
        // Set the opacity of the image
        ctx.globalAlpha = this.alpha;

        // Translate so center the image
        ctx.translate(this.position.x, this.position.y);

        // Draw screen
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);

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
            ctx.fillText(`Max Equations: ${localStorage.getItem(this.storageNames.MAX_EQUATION)}`, 0, 20)
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

    }

}