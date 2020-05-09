class InputHandler {

    constructor(game) {

        this.robots = game.robots;

        this.digit = 0
        this.equationAnswer = "";
        
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));

    }

    // Key down
    onKeyDown(e) {

        // Check if its a number
        if (isFinite(e.key)) {

            for (let i = 0; i < this.robots.length; i++) {

                // Check if the first number of an answer of an equation is the same as the input
                if (this.robots[i].equationAnswer.charAt(this.digit)) {

                    this.equationAnswer += e.key;
                    this.robots[i].isSelected = true;
                    console.log(this.equationAnswer);
                    this.digit++;
                    break;

                }

            }
        
        }
        
    }

    // Key up
    onKeyUp(e) {
        


    }

    // Key hold
    update(game) {

        

    }

}