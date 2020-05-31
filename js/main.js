// Controls the speed of the game
const speedThreshold = 256;

// Game and its context
const gameScene = document.getElementById("gameScene");
const ctx = gameScene.getContext("2d");

const GAME_WIDTH = gameScene.width;
const GAME_HEIGHT = gameScene.height;

const background = new Background(GAME_WIDTH, GAME_HEIGHT);
const game = new Game(GAME_WIDTH, GAME_HEIGHT);

// Initialize game content
background.init(game);
game.init(background);

// Main loop
let lastTime = 0;
function loop(timeStamp) {

    // Clear the screen
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    
    // Draw background
    background.update(deltaTime, timeStamp);
    background.draw(ctx);

    // Draw game
    game.update(deltaTime, timeStamp);
    game.draw(ctx);

    requestAnimationFrame(loop);

}

requestAnimationFrame(loop);