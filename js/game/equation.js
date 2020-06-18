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