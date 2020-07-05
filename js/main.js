// Controls the speed of the game
const speedThreshold = 256;

// Get canvases div
const canvases = document.getElementById("canvases");

// Canvases and its contexts
const gameCanvas = document.getElementById("game");
const gameCtx = gameCanvas.getContext("2d");
const backgroundCanvas = document.getElementById("background");
const backgroundCtx = backgroundCanvas.getContext("2d");
const workshopCanvas = document.getElementById("workshop");
const workshopCtx = workshopCanvas.getContext("2d");
const menuCanvas = document.getElementById("menu");
const menuCtx = menuCanvas.getContext("2d");
const startGameCanvas = document.getElementById("startGame");
const startGameCtx = startGameCanvas.getContext("2d");

const GAME_WIDTH = gameCanvas.width;
const GAME_HEIGHT = gameCanvas.height;

// Create game content
const background = new Background(GAME_WIDTH, GAME_HEIGHT);
const game = new Game(GAME_WIDTH, GAME_HEIGHT);
const menu = new Menu(GAME_WIDTH, GAME_HEIGHT);
const workshop = new Workshop(GAME_WIDTH, GAME_HEIGHT);
const startGame = new StartGame(GAME_WIDTH, GAME_HEIGHT);

// Create input handler
const inputs = new InputHandler();

// Initialize game content
background.init(game);
menu.init(game);
workshop.init();
startGame.init(menu);

// Initialize input handler
inputs.init(canvases, game, background, menu, workshop, startGame);

// Create item lister
const itemLister = new ItemLister(canvases);

// Main loop
let lastTime = 0;
function loop(timeStamp) {

    startGame.draw(startGameCtx)

    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    
    // Draw background
    background.update(deltaTime, timeStamp);
    background.draw(backgroundCtx);

    // Draw game
    if (game.isGame) {

        game.update(deltaTime, timeStamp);
        game.draw(gameCtx);

    }

    // Draw menu
    menu.update();
    menu.draw(menuCtx);

    // Draw workshop
    workshop.update();
    workshop.draw(workshopCtx);

    // Update item list
    itemLister.update();

    requestAnimationFrame(loop);

}

requestAnimationFrame(loop);