class Results {

    constructor() {

        this.storageNames = {

            MAX_EQUATION: "maxEquation",
            ACCURACIES: "ACCURACIES"

        }

    }

    init(game) {

        this.game = game;

        this.player = game.player

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

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
        this.numElements = 6;
        for (let i = 0; i < this.numElements; i++) {

            this.isElementsShowing.push(false);

        }

    }

    // Show the elements
    showResults() {

        let i = 0
        let interval = setInterval(() => {

            this.isElementsShowing[i] = true;
            i++;
            if (i == this.numElements) clearInterval(interval);

        }, 500);

    }

    // Appear on screen plus the elements
    appear() {

        setTimeout(() => {

            // Necessary calculations
            const fps = 60;
            const secondsToAppear = 2;
            const framesInInterval = fps * secondsToAppear;
            const distPerFrame = this.distFromCenter / framesInInterval;

            let interval = setInterval(() => {

                // Move results up by a little
                this.position.y -= distPerFrame;
    
                // Increase alpha by a little
                this.alpha += secondsToAppear / 60;
                if (this.position.y < this.gameHeight / 2) {
    
                    this.position.y = this.gameHeight / 2
                    this.showResults();
                    clearInterval(interval);
                
                }
    
            }, 1 / fps);

        }, 500);

    }

    // Store results to localStorge
    storeResults() {

        // Store and get max number of equations solved
        if (localStorage.getItem(this.storageNames.MAX_EQUATION) == null || 
            this.equation.numEquationsSolved > localStorage.getItem(this.storageNames.MAX_EQUATION)) 
            localStorage.setItem(this.storageNames.MAX_EQUATION, this.equation.numEquationsSolved);

        // Store and get past 30 accuracy for average accuracy
        let pastAccuracies = JSON.parse(`[ ${localStorage.getItem(this.storageNames.ACCURACIES)} ]`)
        if (pastAccuracies[0] == null) pastAccuracies[0] = this.equation.accuracy;
        else if (pastAccuracies.length == 30) pastAccuracies.shift().push(this.equation.accuracy);
        else pastAccuracies.push(this.equation.accuracy);
        localStorage.setItem(this.storageNames.ACCURACIES, pastAccuracies);

        // Calculate average accuracy
        let sum = pastAccuracies.reduce((a, b) => a + b, 0);
        this.averageAccuracy = sum / pastAccuracies.length;

        // Round to hundredths
        this.averageAccuracy = Math.round((this.averageAccuracy + Number.EPSILON) * 100) / 100;

    }

    update() {

        if (this.game.justFinish) {

            this.appear();
            this.storeResults();

        }

    }

    draw(ctx) {
            
        // Translate so center the image
        ctx.translate(this.position.x, this.position.y);

        // Set the opacity of the image
        ctx.globalAlpha = this.alpha;

        // Draw image
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2);

        // Draw results
        ctx.font = "70px SpaceAge";
        ctx.textAlign = "center";
        if (this.isElementsShowing[0]) ctx.fillText("Results", 0, -220);
        ctx.font = "40px SpaceAge";
        if (this.isElementsShowing[1]) ctx.fillText(`Place: ${this.player.place}`, 0, -60);
        if (this.isElementsShowing[2]) ctx.fillText(`Equations Solved: ${this.equation.numEquationsSolved}`, 0 , -20);
        if (this.isElementsShowing[3]) ctx.fillText(`Max Equations: ${localStorage.getItem(this.storageNames.MAX_EQUATION)}`, 0, 20)
        if (this.isElementsShowing[4]) ctx.fillText(`Accuracy: ${this.equation.accuracy * 100}%`, 0, 60);
        if (this.isElementsShowing[5]) ctx.fillText(`Avg Accuracy: ${this.averageAccuracy * 100}%`, 0, 100);

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1;

    }

}