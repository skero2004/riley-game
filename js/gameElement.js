class GameElement {

    constructor() {

        // Default visibility 0
        this.alpha = 0;

        // Default angle is 0 degrees
        this.angle = 0;

        // Defaut scale is 1
        this.scale = 1;
    
        // Default not moving
        this.isMoving = false;

        // Default not custom border
        this.isCustomBorder = false;

    }

    init(canvas = 0) {

        // Get width and height of the game
        if (canvas) {

            this.gameWidth = canvas.gameWidth;
            this.gameHeight = canvas.gameHeight;

        }

    }

    setPosition(x, y) {

        this.position = {

            x: x,
            y: y

        }

        this.lastPositionX = [];
        this.lastPositionY = [];
        
    }

    setBorder(top, bottom, left, right) {

        this.isCustomBorder = true;

        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;

    }

    appear(seconds, completion = () => {}) {

        // Necessary calculations
        const fps = 60;
        const framesInInterval = fps * seconds;
        const interval = setInterval(() => {

            // Increase alpha by a little
            if (seconds) this.alpha += 1 / framesInInterval;
            else this.alpha = 1;

            if (this.alpha >= 1) {

                this.alpha = 1;
                completion();
                clearInterval(interval);
            
            }
    
        }, 1000 / fps);

    }

    disappear(seconds, completion = () => {}) {

        // Necessary calculations
        const fps = 60;
        const framesInInterval = fps * seconds;
        const interval = setInterval(() => {

            // Decrease alpha by a little
            if (seconds) this.alpha -= 1 / framesInInterval;
            else this.alpha = 0;

            if (this.alpha <= 0) {

                this.alpha = 0;
                completion();
                clearInterval(interval);
            
            }
    
        }, 1000 / fps);

    }

    moveBy(seconds, x, y, completion = () => {}) {

        this.moveTo(seconds, this.position.x + x, this.position.y + y, completion);

    }

    moveTo(seconds, x, y, completion = () => {}) {

        // How much to move
        const moveX = x - this.position.x;
        const moveY = y - this.position.y;

        // Necessary calculations
        const fps = 60;
        const framesInInterval = fps * seconds;
        const interval = setInterval(() => {

            // Increase x by a little
            if (seconds) this.position.x += moveX / framesInInterval;
            else this.position.x = x;

            // Increase y by a little
            if (seconds) this.position.y += moveY / framesInInterval;
            else this.position.y = y;

            if (((moveX < 0 && this.position.x <= x) || (moveX > 0 && this.position.x >= x) || (moveX == 0)) &&
                ((moveY < 0 && this.position.y <= y) || (moveY > 0 && this.position.y >= y) || (moveY == 0))) {

                this.position.x = x;
                this.position.y = y;
                completion();
                clearInterval(interval);
            
            }
    
        }, 1000 / fps);

    }

    rotateBy(seconds, angle, completion = () => {}) {

        this.rotateTo(seconds, this.angle + angle, completion);

    }

    rotateTo(seconds, angle, completion = () => {}) {
        
        // How much to rotate
        const rotateAngle = angle - this.angle;

        // Necessary calculations
        const fps = 60;
        const framesInInterval = fps * seconds;
        const interval = setInterval(() => {

            // Rotate by a little
            if (seconds) this.angle += rotateAngle / framesInInterval;
            else this.angle = angle;
            
            if ((rotateAngle < 0 && this.angle <= angle) || 
                (rotateAngle > 0 && this.angle >= angle) || 
                (rotateAngle == 0)) {

                this.angle = angle;
                completion();
                clearInterval(interval);
            
            }
    
        }, 1000 / fps);

    }

    isMouseOver(mouseX, mouseY) {

        if (mouseX > this.left && mouseX < this.right &&
            mouseY > this.top && mouseY < this.bottom)
            return true;
        else
            return false;

    }

    update() {

        // Get if object is moving
        if ((this.position.x == this.lastPositionX[0] && this.position.y == this.lastPositionY[0]) || 
            (!this.lastPositionX[0] || !this.lastPositionY[0])) 
            this.isMoving = false;
        else this.isMoving = true;

        this.lastPositionX.push(this.position.x);
        this.lastPositionY.push(this.position.y);
        if (this.lastPositionX.length == 5) this.lastPositionX.shift();
        if (this.lastPositionY.length == 5) this.lastPositionY.shift();

    }

}