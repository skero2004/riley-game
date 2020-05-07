class Robot {

    constructor(game) {

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.width = 70;
        this.height = 70;

        // Speed is from -20 to -10
        this.speed = -(10 + Math.round(Math.random() * 10));

        this.position = {

            x: this.gameWidth,
            y: Math.round(Math.random() * (this.gameHeight - this.height))

        }

    }

    makeEquation() {

        // Operation chooser
        const rand = Math.ceil(Math.random() * 4);
        let operation;
        if (rand == 1) {
            operation = "+";
        } else if (rand == 2) {
            operation = "-";
        } else if (this.rand == 3) {
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
        this.equation = `${numberOne} ${operation} ${numberTwo} =`;
        console.log(this.equation);        

    }

    draw(ctx) {

        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    }

    update(deltaTime) {
        
        this.position.x += this.speed / deltaTime;

    }

}