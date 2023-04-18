import { fetchHighScores } from "../game-over/index.js";
import { fetchTopThree } from "../main-menu/index.js";
import Game from "./game.js";
window.addEventListener("load", function () {
  const canvas = document.getElementById("gameCanvas");
  const mainMenu = document.getElementById("mainMenuCard");
  // Set gameOverCard hidden
  const gameOver = document.getElementById("gameOverCard");
  gameOver.style.visibility = "hidden";
  mainMenu.style.visibility = "hidden";
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;

  //pelin jokaisen muuttujaan pääsee käsiksi suoraan kutsumalla "game." muuttujan nimeä

  function startGame() {
    game.gameOver = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //poistetaan vanhant neliöt
    game.update();
    game.draw(ctx);

    if (!game.gameOver) {
      //kutsuu funktion millä piirretään seuraava frame
      requestAnimationFrame(startGame);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  //alustetaan pelin tiedot
  game.startUp();
  //aloitetaan peli
  startGame();
});

// Retry button function to gameOverCard
document.getElementById("retryButton").addEventListener("click", () => {
  console.log("retry button pressed :o");

  // Hide gameOver and make gameCanvas visible again,
  const canvas = document.getElementById("gameCanvas");
  const gameOver = document.getElementById("gameOverCard");
  canvas.style.visibility = "";
  gameOver.style.visibility = "hidden";

  // Trigger "load" event to restart game loop
  dispatchEvent(new Event("load"));
});

document.getElementById("play-btn").addEventListener("click", function() {
  console.log("start button pressed :o");

  // Hide gameOver and make gameCanvas visible again,
  const canvas = document.getElementById("gameCanvas");
  const gameOver = document.getElementById("gameOverCard");
  const mainMenu = document.getElementById("mainMenuCard");
  canvas.style.visibility = "";
  gameOver.style.visibility = "hidden";
  mainMenu.style.visibility = "hidden";
  // Trigger "load" event to restart game loop
  dispatchEvent(new Event("load"));
});


// Main menu button fucntion to gameOverCard
document.getElementById("mainMenuButton").addEventListener("click", async function() {
  console.log("mainMenu button pressed :o");
  const scores = await fetchTopThree();
  console.log(scores);
  const canvas = document.getElementById("gameCanvas");
  const gameOver = document.getElementById("gameOverCard");
  const mainMenu = document.getElementById("mainMenuCard");
  canvas.style.visibility = "hidden";
  gameOver.style.visibility = "hidden";
  mainMenu.style.visibility = "visible";
});

document.getElementById("instructions-btn").addEventListener("click",function() {
  //const instructions = document.getElementById("instructionsCard");
  
  console.log("Instruction button clicked");
})

document.getElementById("settings-btn").addEventListener("click",function() {
  //const settings = document.getElementById("settingsCard");

  console.log("Setting button clicked")
});

document.getElementById("submitButton").addEventListener("click", () => {
  console.log("submit button clicked");
});
