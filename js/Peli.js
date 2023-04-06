import Game from "./game.js";


window.addEventListener("load", function() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 800;


    
    function startGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);   //poistetaan vanhant neliöt
        game.update();
        game.draw(ctx);

        if(!game.gameOver) {
            requestAnimationFrame(startGame);
        }
    }

    const game = new Game(canvas.width, canvas.height);
        
    game.startUp();
    startGame();
});