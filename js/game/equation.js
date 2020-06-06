class Equation {

    init(game) {

        this.game = game;

        this.player = game.player;

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.digit = 0;
        this.typing = "";

        this.textColor = "white";

        this.numEquationsSolved = 0;

        this.numTotalKeyStrokes = 0;
        this.correctKeyStrokes = 0;
        this.accuracy = 1; // 100%

        this.position = {

            x: this.gameWidth / 2,
            y: 570

        }

        this.alpha = 1;

        this.makeEquation();

    }

    // Create an equation with its answer
    makeEquation() {

        // Operation chooser
        const rand = Math.ceil(Math.random() * 4);
        let operation;
        if (rand == 1) {
            operation = "+";
        } else if (rand == 2) {
            operation = "-";
        } else if (rand == 3) {
            operation = "x";
        } else {
            operation = "/";
        }

        // Numbers chooser
        let numberOne, numberTwo;
        if (operation == "+") {
            
            // 1 ~ 50 for addition
            numberOne = Math.ceil(Math.random() * 50);
            numberTwo = Math.ceil(Math.random() * 50);
        
        } else if (operation == "-") {

            // 1 ~ 100 and first number bigger for subtraction
            numberOne = Math.ceil(Math.random() * 100);
            numberTwo = Math.ceil(Math.random() * 100);
            while (numberTwo > numberOne) {
                numberTwo = Math.ceil(Math.random() * 100);
            }

        } 
        else if (operation == "x") {

            // 1 ~ 10 for multiplication
            numberOne = Math.ceil(Math.random() * 10);
            numberTwo = Math.ceil(Math.random() * 10);

        } else {

            // 2 ~ 100 but and must be divisible for division
            numberOne = Math.ceil(Math.random() * 99) + 1;
            
            // numberOne cannot be prime
            const isPrime = num => {
                for(let i = 2; i < num; i++)
                     if(num % i === 0) return false;
                return num > 1;
            }
            while (isPrime(numberOne)) {
                numberOne = Math.ceil(Math.random() * 99) + 1;
            }

            // numberOne must be divisible by numberTwo
            numberTwo = Math.ceil(Math.random() * 49) + 1;
            while (numberOne % numberTwo != 0) {
                numberTwo = Math.ceil(Math.random() * 49) + 1;
            }

        }

        // Concatenate to make equation
        this.equation = `${numberOne} ${operation} ${numberTwo} = `;
        this.answer = eval(this.equation.replace("x", "*").replace("=", "")).toString();
        
    }

    // What the player is typing
    addTyping(number) {

        if (this.game.isGame) {

            // Increment total number of keystrokes
            this.numTotalKeyStrokes++;

            // If it is the correct number, add digit and add to typing
            if (number == this.answer.charAt(this.digit)) {

                this.correctKeyStrokes++;

                this.typing += number;
                this.digit++;

                // Check if the answer is correct. If yes, then reset and make a new equation
                if (this.typing == this.answer) {

                    // Change text color to green
                    this.textColor = "lime";

                    // Move player position
                    this.player.moveRight();

                    // Increment number of equations solved
                    this.numEquationsSolved++;

                    // Add delay
                    setTimeout(() => {

                        // Reset equation
                        this.digit = 0;
                        this.typing = "";
                        this.textColor = "white";
                        this.makeEquation();

                    }, 300);

                }

            } else { // If it not the correct number, move player to the left and red pulse

                this.player.moveLeft();

                if (this.textColor == "white") {

                    // Fade from red to white
                    let redness = 0;
                    let interval = setInterval(() => {

                        this.textColor = `rgba(255, ${redness}, ${redness})`;
                        redness += 10; // increase redness
                        if (redness > 255) {

                            this.textColor = "white";
                            clearInterval(interval);
                        
                        }

                    }, 15);

                }
        
            }

        }

    }

    disappear() {

        const secondsToDisappear = 2;
        const framesInInterval = fps * secondsToDisappear;
        let interval = setInterval(() => {

            // Increase alpha by a little
            this.alpha -= 1 / framesInInterval;
            if (this.position.y < this.gameHeight / 2 - this.distFromCenter) {

                this.position.y = this.gameHeight / 2 - this.distFromCenter;
                this.alpha = 0;
                clearInterval(interval);
            
            }

        }, 1 / fps);

    }

    appear() {

        // Necessary calculations
        const fps = 60;
        const secondsToAppear = 1;
        const framesInInterval = fps * secondsToAppear;
        let interval = setInterval(() => {

            // Increase alpha by a little
            this.alpha += 1 / framesInInterval;
            if (this.alpha > 1) {

                this.alpha = 1;
                clearInterval(interval);
            
            }

        }, 1 / fps);

    }

    disappear() {

        // Necessary calculations
        const fps = 60;
        const secondsToDisappear = 1;
        const framesInInterval = fps * secondsToDisappear;
        let interval = setInterval(() => {

            // Increase alpha by a little
            this.alpha -= 1 / framesInInterval;
            if (this.alpha < 0) {

                this.alpha = 0;
                clearInterval(interval);
            
            }

        }, 1 / fps);

    }

    draw(ctx) {

        ctx.globalAlpha = this.alpha;
        ctx.font = "30px Arial";
        ctx.fillStyle = this.textColor;
        ctx.textAlign = "center";
        ctx.fillText(this.equation + this.typing, this.position.x, this.position.y);
        ctx.globalAlpha = 1;

    }

    update() {

        if (this.game.justFinish) this.disappear();

        this.accuracy = this.correctKeyStrokes / this.numTotalKeyStrokes;
        this.accuracy = Math.round((this.accuracy + Number.EPSILON) * 100) / 100;

    }

}