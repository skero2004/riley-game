class Equation {

    init(game) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.player = game.player;

        this.digit = 0;
        this.typing = "";

        this.textColor = "white";

        this.position = {

            x: this.gameWidth / 2,
            y: 570

        }

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

        // If it is the correct number, add digit and add to typing
        if (number == this.answer.charAt(this.digit)) {

            this.typing += number;
            this.digit++;

            // Check if the answer is correct. If yes, then reset and make a new equation
            if (this.typing == this.answer) {

                // Change text color to green
                this.textColor = "lime";

                // Move player position
                this.player.moveRight();

                // Add delay
                setTimeout(() => {

                    // Reset equation
                    this.digit = 0;
                    this.typing = "";
                    this.textColor = "white";
                    this.makeEquation();

                }, 300);

            }

        } else {
 
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

    draw(ctx) {

        ctx.font = "30px Arial";
        ctx.fillStyle = this.textColor;
        ctx.textAlign = "center";
        ctx.fillText(this.equation + this.typing, this.position.x, this.position.y);

    }

    update() {



    }

}