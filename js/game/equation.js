class Equation extends TextElement {

    init(game) {

        super.init(game);

        this.setPosition(this.gameWidth / 2, 570);

        this.game = game;

        this.player = game.player;

        this.digit = 0;
        this.typing = "";

        this.numEquationsSolved = 0;

        this.numTotalKeyStrokes = 0;
        this.correctKeyStrokes = 0;
        this.accuracy = 1; // 100%

        this.makeEquation();

        this.setFont("30px Arial");
        this.setColor("white");

    }

    // Create an equation with its answer
    makeEquation() {

        // Operation chooser
        let operation;
        do {

            const rand = Math.ceil(Math.random() * 4);
        
            if (rand == 1) {
                operation = "+";
            } else if (rand == 2) {
                operation = "-";
            } else if (rand == 3) {
                operation = "x";
            } else {
                operation = "/";
            }

        } while (!this.game.usedOperations.includes(operation))

        // Numbers chooser
        let numberOne, numberTwo, maxNumber, minNumber;
        if (operation == "+") {

            // Set number according to difficulty
            if (this.game.difficulty == "easy") {
                
                minNumber = 1;
                maxNumber = 10;
            
            } else if (this.game.difficulty == "medium") {

                minNumber = 10;
                maxNumber = 20;

            } else {
            
                minNumber = 20;
                maxNumber = 50;
            
            }

            numberOne = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));
            numberTwo = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));
        
        } else if (operation == "-") {

            // Set number according to difficulty
            if (this.game.difficulty == "easy") {
                
                minNumber = 1;
                maxNumber = 10;
            
            } else if (this.game.difficulty == "medium") {
                
                minNumber = 10;
                maxNumber = 30;

            } else {
                
                minNumber = 30;
                maxNumber = 100;

            }

            numberOne = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));
            numberTwo = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));
            while (numberTwo > numberOne) {
                numberTwo = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));
            }

        } else if (operation == "x") {

            // Set number according to difficulty
            if (this.game.difficulty == "easy") {
            
                minNumber = 1;
                maxNumber = 4;
            
            }
            else if (this.game.difficulty == "medium") {
            
                minNumber = 3;
                maxNumber = 7;
            
            }
            else {
                
                minNumber = 6;
                maxNumber = 10;
            
            }

            numberOne = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));
            numberTwo = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));

        } else {

            // Set number according to difficulty
            if (this.game.difficulty == "easy") {

                minNumber = 1;
                maxNumber = 15;

            } else if (this.game.difficulty == "medium") {
                
                minNumber = 2;
                maxNumber = 40;
            
            } else {
                
                minNumber = 3;
                maxNumber = 100;
            
            }

            numberOne = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));
            
            // numberOne cannot be prime
            const isPrime = num => {
                for(let i = 2; i < num; i++)
                    if(num % i === 0) return false;
                return num > 1;
            }
            while (isPrime(numberOne)) {
                numberOne = minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1));
            }

            // numberOne must be divisible by numberTwo
            numberTwo = minNumber + Math.floor(Math.random() * numberOne / 2);
            while (numberOne % numberTwo != 0) {
                numberTwo = minNumber + Math.floor(Math.random() * numberOne / 2);
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
                    this.setColor("lime");

                    // Move player position
                    this.player.moveRight();

                    // Increment number of equations solved
                    this.numEquationsSolved++;

                    // Add delay
                    setTimeout(() => {

                        // Reset equation
                        this.digit = 0;
                        this.typing = "";
                        this.setColor("white");
                        this.makeEquation();

                    }, 300);

                }

            } else { // If it not the correct number, move player to the left and red pulse

                this.player.moveLeft();
                this.pulse(0.5, "red");
        
            }

        }

    }

    appear() {

        super.appear(0.5);

    }

    disappear() {

        super.disappear(0.5);

    }

    update() {

        if (this.game.justFinish) this.disappear();

        this.accuracy = this.correctKeyStrokes / this.numTotalKeyStrokes;
        this.accuracy = Math.round((this.accuracy + Number.EPSILON) * 100) / 100;

        this.setText(this.equation + this.typing);
        
        super.update();

    }

}