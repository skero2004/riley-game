// Controls the speed of the game
var speedThreshold = 256;

// Background and its context
const backgroundScene = document.getElementById("background");
const backgroundCtx = backgroundScene.getContext("2d");

// Game and its context
const gameScene = document.getElementById("gameScene");
const gameCtx = gameScene.getContext("2d");

// Workshop and its context
const workshopScene = document.getElementById("workshop");
const workshopCtx = workshop.getContext("2d");

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
    
    // Draw background
    background.update(deltaTime, timeStamp);
    background.draw(backgroundCtx);

    // Draw game
    game.update(deltaTime, timeStamp);
    game.draw(gameCtx);

    // Draw workshop


    requestAnimationFrame(loop);

}

requestAnimationFrame(loop);