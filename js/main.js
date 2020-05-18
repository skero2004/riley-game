var speedThreshold = 256;

// gameScene and context variables
const gameScene = document.getElementById("gameScene");
const ctx = gameScene.getContext("2d");

const GAME_WIDTH = gameScene.width;
const GAME_HEIGHT = gameScene.height;

const background = new Background(GAME_WIDTH, GAME_HEIGHT);
background.start();

const game = new Game(GAME_WIDTH, GAME_HEIGHT, background);
game.start();

// Main loop
let lastTime = 0;
function loop(timeStamp) {

    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    // Clear the screen
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw background
    background.update(deltaTime, timeStamp);
    background.draw(ctx);

    // Draw game
    game.update(deltaTime, timeStamp);
    game.draw(ctx);

    requestAnimationFrame(loop);

}

requestAnimationFrame(loop);