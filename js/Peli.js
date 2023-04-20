import { fetchHighScores } from "../game-over/index.js";
import { fetchTopThree } from "../main-menu/index.js";
import Game from "./game.js";

const mainMenu = document.getElementById("mainMenuCard");
mainMenu.style.visibility = "visible";
const canvas = document.getElementById("gameCanvas");
canvas.style.visibility = "hidden";

window.addEventListener("load", async function () {
  const settingsMenu = document.getElementById("settingsCard");
  const instructionsMenu = document.getElementById("instructionsCard");

  // Set gameOverCard hidden
  const gameOver = document.getElementById("gameOverCard");
  await fetchHighScores();
  gameOver.style.visibility = "hidden";
  instructionsMenu.style.visibility = "hidden";
  settingsMenu.style.visibility = "hidden";
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;

  //pelin jokaisen muuttujaan pääsee käsiksi suoraan kutsumalla "game." muuttujan nimeä

  function startGame() {
    const mainMenu = document.getElementById("mainMenuCard");
    mainMenu.style.visibility = "false";
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

document.getElementById("play-btn").addEventListener("click", function() {
  console.log("start button pressed :o");

  // Hide gameOver and make gameCanvas visible again,
  const gameOver = document.getElementById("gameOverCard");
  const mainMenu = document.getElementById("mainMenuCard");
  canvas.style.visibility = "visible";
  gameOver.style.visibility = "hidden";
  mainMenu.style.visibility = "hidden";
  // Trigger "load" event to restart game loop
});


// Retry button function to gameOverCard
document.getElementById("retryButton").addEventListener("click", function () {
  console.log("retry button pressed :o");

  // Hide gameOver and make gameCanvas visible again,
  const gameOver = document.getElementById("gameOverCard");
  const mainMenu = document.getElementById("mainMenuCard");
  mainMenu.style.visibility = "hidden";
  gameOver.style.visibility = "hidden";
  canvas.style.visibility = "visible";

  // Trigger "load" event to restart game loop
  dispatchEvent(new Event("load"));
});



// Main menu button fucntion to gameOverCard
document.getElementById("mainMenuButton").addEventListener("click", async function() {
  console.log("mainMenu button pressed :o");
  const scores = await fetchTopThree();
  console.log(scores);
  const gameOver = document.getElementById("gameOverCard");
  const mainMenu = document.getElementById("mainMenuCard");
  canvas.style.visibility = "hidden";
  gameOver.style.visibility = "hidden";
  mainMenu.style.visibility = "visible";
});

document.getElementById("submitButton").addEventListener("click", async function() {
  console.log("submit button clicked");
})

document.getElementById("instructions-btn").addEventListener("click",function() {
  const instructions = document.getElementById("instructionsCard");
  const menu = document.getElementById("mainMenuCard");
  menu.style.visibility = "hidden";
  instructions.style.visibility = "visible";
  console.log("Instruction button clicked");
})

document.getElementById("settings-btn").addEventListener("click",function() {
  const settings = document.getElementById("settingsCard");
  const menu = document.getElementById("mainMenuCard");
  settings.style.visibility="visible";
  menu.style.visibility="hidden";
});

document.getElementById("back-btn-1").addEventListener("click", function() {
  console.log("Back button clicked");
  const instructions = document.getElementById("instructionsCard");
  const menu = document.getElementById("mainMenuCard");
  instructions.style.visibility = "hidden";
  menu.style.visibility = "visible";
});

document.getElementById("back-btn-2").addEventListener("click", function() {
  console.log("Back button clicked");
  const settings = document.getElementById("settingsCard");
  const menu = document.getElementById("mainMenuCard");
  settings.style.visibility = "hidden";
  menu.style.visibility = "visible";
});
