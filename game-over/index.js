const card = document.getElementById("gameOverCard");
const scores = document.getElementById("highScores");

// Card visibility
//  card.style.visibility = "hidden";

// Main menu button
const toMainMenu = () => {
  console.log("to main menu");

  //card.style.visibility = "hidden";
};

// Retry button
const retry = () => {
  console.log("retry");

  //card.style.visibility = "hidden";
};

const HighScores = [
  { name: "player1", score: 20 },
  { name: "player2", score: 40 },
  { name: "player3", score: 60 },
  { name: "player4", score: 80 },
  { name: "player5", score: 990 },
];

const fetchHighScores = () => {
  console.log("fetching highscores");
  let score = HighScores;
  console.log(score.length);
  console.log(score[0].name);
};
